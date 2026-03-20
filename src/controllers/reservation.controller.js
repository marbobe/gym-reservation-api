import { makeReservation, getReservations, cancelReservation, editReservation, getReservation } from "../services/reservation.service.js";

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

export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await getReservation(id);

        if (!reservation) {
            return res.status(404).json({ error: `La reserva con id ${id} no existe.` });
        }

        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getAll = async (req, res) => {
    try {
        const { roomId } = req.query;
        const reservations = await getReservations(roomId);

        res.status(200).json(reservations);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

export const edit = async (req, res) => {

    try {
        const { id } = req.params;
        const dataToUpdate = req.body;

        if (!dataToUpdate || Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({ error: "Debes enviar al menos un campo para actualizar." });
        }

        const reservationEdited = await editReservation(id, dataToUpdate);

        res.status(200).json({
            message: `Reserva con id ${id} editada correctamente`,
            reservation: reservationEdited
        })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "La reserva que intentas editar no existe." });
        }
        res.status(400).json({ error: error.message });
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