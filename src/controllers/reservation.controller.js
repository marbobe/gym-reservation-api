import { makeReservation } from "../services/reservation.service.js";

export const create = async (req, res) => {
    try {
        const { roomId, userId, startTime, endTime } = req.body;
        const newReservationId = await makeReservation(roomId, userId, startTime, endTime);

        res.status(201).json({
            message: 'Reserva creada correctamente',
            id: newReservationId,
            roomId: roomId,
            userId: userId,
            startTime: startTime,
            endTime: endTime
        });
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
};