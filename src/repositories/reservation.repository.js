import { prisma } from '../config/prisma.js';

/**
 * Comprueba si existe alguna reserva activa en una sala que se solape con el horario indicado.
 * @param {number|string} roomId - ID de la sala.
 * @param {string} startTime - Fecha y hora de inicio de la nueva reserva.
 * @param {string} endTime - Fecha y hora de fin de la nueva reserva.
 * @param {number|string} [excludeReservationId] - (Opcional) ID de una reserva a ignorar (útil al editar).
 * @returns {Promise<boolean>} - Devuelve `true` si hay solapamiento, `false` si la sala está libre.
 */
export const checkOverlap = async (roomId, startTime, endTime, excludeReservationId = null) => {

    const excludeCondition = excludeReservationId ? { id: { not: parseInt(excludeReservationId) } } : {};

    const start = new Date(startTime);
    const end = new Date(endTime);

    const overlap = await prisma.reservation.findFirst({
        where: {
            roomId: parseInt(roomId),
            status: { not: 'cancelled' },
            ...excludeCondition,
            AND: [
                { startTime: { lt: end } },
                { endTime: { gt: start } }
            ]
        }
    });

    return overlap !== null;
};

/**
 * Crea una nueva reserva en la base de datos.
 * @param {number|string} roomId - ID de la sala.
 * @param {number|string} userId - ID del usuario.
 * @param {string} startTime - Fecha y hora de inicio en formato ISO.
 * @param {string} endTime - Fecha y hora de fin en formato ISO.
 * @returns {Promise<number>} - Devuelve el ID de la reserva recién creada.
 */
export const createReservation = async (roomId, userId, startTime, endTime) => {
    const newReservation = await prisma.reservation.create({
        data: {
            roomId: roomId,
            userId: userId,
            startTime: new Date(startTime),
            endTime: new Date(endTime)
        }
    });
    return newReservation.id;
};

/**
 * Obtener una reserva por el id
 * @param {string|number} reservationId -id de la reserva
 * @returns {Promise<Object|null>} Devuelve el objeto de la reserva, o null si no existe.
 */
export const getReservationById = async (reservationId) => {
    return await prisma.reservation.findUnique({
        where: { id: parseInt(reservationId) }
    });
}

/**
 * Obtiene la lista de reservas. Puede filtrar por sala y siempre incluye los datos de la sala asociada.
 * @param {number|string} [roomId] - (Opcional) ID de la sala para filtrar.
 * @returns {Promise<Array<Object>>} - Lista de reservas con la información de la sala (JOIN).
 */
export const getAllReservations = async (roomId) => {

    return await prisma.reservation.findMany({
        //si es undefined no aplica filtro where
        where: roomId ? { roomId: parseInt(roomId) } : undefined,

        include: {
            room: true
        },

        orderBy: {
            startTime: 'desc'
        }
    });
};

/**
 * Edita los datos de una reserva existente
 * @param {string|number} reservationId - el Id de la reserva a editar
 * @param {Object} dataToUpdate - Objeto con los datos a actualizar
 * @returns 
 */
export const editReservationById = async (reservationId, dataToUpdate) => {

    return await prisma.reservation.update({
        where: { id: parseInt(reservationId) },
        data: dataToUpdate
    });
}

/**
 * Cancela una reserva cambiando su estado a 'cancelled'. (Soft Delete)
 * @param {number|string} reservationId - ID de la reserva a cancelar.
 * @returns {Promise<number>} - Devuelve 1 si se ha actualizado correctamente, 0 si no existía.
 */
export const cancelReservationById = async (reservationId) => {

    try {
        const updated = await prisma.reservation.update({
            where: { id: parseInt(reservationId) },
            data: { status: 'cancelled' }
        });
        //devuelve 1 afectado
        return 1
    } catch (error) {
        if (error.code === 'P2025') {
            //devuelve 0 afectado
            return 0;
        }
        throw error;
    }
}


