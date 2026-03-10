import { prisma } from '../config/prisma.js';

/**
 * Obtiene todas las salas registradas en el sistema.
 * @returns {Promise<Array<Object>>} Lista de objetos de sala (id, name, capacity, createdAt).
 */
export const getAllRooms = async () => {
    return await prisma.room.findMany();
}

/**
 * Obtener una sala a partir del id
 * @param {string|number} roomId - El id de la sala 
 * @returns {Promise<Object|null>} Devuelve el objeto de la sala, o null si no existe.
 */
export const getRoomById = async (roomId) => {
    return await prisma.room.findUnique({
        where: { id: parseInt(roomId) }
    });
}

/**
 * Crea una nueva sala en la base de datos.
 * @param {string} name - Nombre de la sala.
 * @param {number} capacity - Capacidad máxima de la sala.
 * @returns {Promise<number>} El ID de la sala recién insertada.
 */
export const createRoom = async (name, capacity, pricePerHour, desecription, imageUrl) => {
    const newRoom = await prisma.room.create({
        data: {
            name: name,
            capacity: capacity,
            pricePerHour: pricePerHour,
            description: desecription,
            imageUrl: imageUrl
        }
    });
    return newRoom.id;
}

/**
 * Edita los datos de una sala existente
 * @param {string | number} roomId - el ID de la sala a editar
 * @param {Object} dataToUpdate - Objeto con datos a actualizar
 * @returns 
 */
export const editRoomById = async (roomId, dataToUpdate) => {

    return await prisma.room.update({
        where: { id: parseInt(roomId) },
        data: dataToUpdate
    });
}

/**
 * elimina una sala cambiando su estado a 'deleted'. (Soft Delete)
 * @param {number|string} roomId - ID de la sala a eliminar.
 * @returns {Promise<number>} - Devuelve 1 si se ha actualizado correctamente, 0 si no existía.
 */
export const deleteRoomById = async (roomId) => {

    try {
        const deleted = await prisma.room.update({
            where: { id: parseInt(roomId) },
            data: { status: 'deleted' }
        })

        return 1
    } catch (error) {
        if (error.code === 'P2025') {
            return 0;
        }
        throw error;
    }
}
