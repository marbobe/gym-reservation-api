import { createRoom, getAllRooms } from "../repositories/room.repository.js";

export const getRooms = async () => {
    return await getAllRooms();
}

export const addRoom = async (name, capacity) => {
    if (capacity < 1) {
        throw new Error("La capacidad debe ser mayor a 0")
    }
    return await createRoom(name, capacity);
}