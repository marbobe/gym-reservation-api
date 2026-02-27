import { checkOverlap, createReservation, getAllReservations, cancelReservationById } from "../repositories/reservation.repository.js";


/**
 * Crea una nueva reserva verificando previamente que la sala no esté ocupada (solapamiento).
 * @param {number} roomId - ID de la sala a reservar.
 * @param {number} userId - ID del usuario que hace la reserva.
 * @param {string} startTime - Fecha y hora de inicio (Ej: '2026-03-01 10:00:00'). Debe ser menor a endTime.
 * @param {string} endTime - Fecha y hora de fin.
 * @throws {Error} Si las fechas son ilógicas o si la sala ya está reservada en ese horario.
 * @returns {Promise<number>} Devuelve el ID de la nueva reserva creada en la base de datos.
 */
export const makeReservation = async (roomId, userId, startTime, endTime) => {
    if (startTime >= endTime) {
        throw new Error('La hora de fin debe ser estrictamente posterior a la hora de inicio')
    }

    const isOverlap = await checkOverlap(roomId, startTime, endTime);

    if (isOverlap) {
        throw new Error('La sala ya está reservada en ese horario. Por favor, elige otro.');
    }

    return await createReservation(roomId, userId, startTime, endTime);
}

/**
 * Obtiene la lista de reservas.
 * @param {number} [roomId] - (Opcional) ID de la sala para filtrar los resultados.
 * @returns {Promise<Array>} Devuelve un array con todas las reservas (o las filtradas).
 */
export const getReservations = async (roomId) => {
    return await getAllReservations(roomId)
}

/**
 * Cancela una reserva existente utilizando borrado lógico (Soft Delete).
 * @param {number} reservationId - ID de la reserva a cancelar.
 * @throws {Error} Si la reserva no existe o ya estaba cancelada previamente.
 * @returns {Promise<boolean>} Devuelve true si el estado se cambió correctamente.
 */
export const cancelReservation = async (reservationId) => {
    const cancelled = await cancelReservationById(reservationId);
    if (!cancelled) {
        throw new Error('Reserva no eoncotrada o ya cancelada');
    }
    return true
}