import { getRooms, addRoom } from '../services/room.service.js';

export const getAll = async (req, res) => {

    try {
        const rooms = await getRooms();
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor al obtener salas' })
    }

}

export const create = async (req, res) => {

    try {
        const { name, capacity } = req.body;
        const newRoomId = await addRoom(name, capacity);

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