import { makeReservation, getReservations, cancelReservation } from "../services/reservation.service.js";

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

export const getAll = async (req, res) => {
    try {
        const { roomId } = req.query;
        const reservations = await getReservations(roomId);

        res.status(200).json(reservations);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const cancel = async (req, res) => {
    try {
        const { id } = req.params;
        const reservationCancelled = await cancelReservation(id);

        if (reservationCancelled) {
            res.status(200).json(`Reserva con id ${id} cancelada correctamente`)
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}