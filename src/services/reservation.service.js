import { checkOverlap, createReservation } from "../repositories/reservation.repository.js";

export const makeReservation = async (roomId, userId, startTime, endTime) => {
    if (startTime > endTime) {
        throw new Error('La hora de fin debe ser estrictamente posterior a la hora de inicio')
    }

    const isOverlap = await checkOverlap(roomId, startTime, endTime);

    if (isOverlap) {
        throw new Error('La sala ya está reservada en ese horario. Por favor, elige otro.');
    }

    return await createReservation(roomId, userId, startTime, endTime);
}