import { getRooms, addRoom, editRoom, getRoom, deleteRoom } from '../services/room.service.js';

export const getAll = async (req, res) => {

    try {
        const rooms = await getRooms();
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor al obtener salas' })
    }

}

export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await getRoom(id);

        if (!room) {
            return res.status(404).json({ error: `La sala con id: ${id}, no existe.` });
        }

        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const create = async (req, res) => {

    try {
        const { name, capacity, pricePerHour, description, imageUrl } = req.body;
        const newRoomId = await addRoom(name, capacity, pricePerHour, description, imageUrl);

        res.status(201).json({
            message: 'Sala creada correctamente',
            id: newRoomId,
            name: name,
            capacity: capacity
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const edit = async (req, res) => {

    try {
        const { id } = req.params;
        const dataToUpdate = req.body;

        if (!dataToUpdate || Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({ error: "Debes enviar al menos un campo para actualizar." });
        }

        const roomEdited = await editRoom(id, dataToUpdate);

        res.status(200).json({
            message: `Sala con id ${id} editada correctamente.`,
            room: roomEdited
        })

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "La sala que intentas editar no existe." });
        }
        res.status(400).json({ error: error.message });
    }

}

export const softDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const roomDeleted = await deleteRoom(id);

        res.status(200).json({
            message: `Sala con id: ${id}, eliminada correctamente`,
            room: roomDeleted
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}