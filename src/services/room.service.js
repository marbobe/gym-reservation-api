import { createRoom, getAllRooms } from "../repositories/room.repository.js";

/**
 * Obtiene todas las salas disponibles en el sistema.
 * @returns {Promise<Array>} Devuelve un array de objetos de tipo sala.
 */
export const getRooms = async () => {
    return await getAllRooms();
}

/**
 * Registra una nueva sala en el gimnasio.
 * @param {string} name - Nombre descriptivo de la sala (Ej: 'Sala Yoga').
 * @param {number} capacity - Aforo máximo de la sala. Debe ser mayor a 0.
 * @throws {Error} Si la capacidad es menor a 1.
 * @returns {Promise<number>} Devuelve el ID numérico de la sala recién creada.
 */
export const addRoom = async (name, capacity) => {
    if (capacity < 1) {
        throw new Error("La capacidad debe ser mayor a 0")
    }
    return await createRoom(name, capacity);
}