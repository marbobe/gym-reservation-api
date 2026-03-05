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
 * @param {number} pricePerHour - Precio por hora de alquiler de la sala.
 * @param {string} description - Cualidades y equipamiento de la sala.
 * @param {string} imageUrl - Foto descriptiva de la sala.
 * @throws {Error} Si la capacidad es menor a 1 o el precio es negativo.
 * @returns {Promise<number>} Devuelve el ID numérico de la sala recién creada.
 */
export const addRoom = async (name, capacity, pricePerHour, description, imageUrl) => {
    if (capacity < 1) {
        throw new Error("La capacidad debe ser mayor a 0")
    }

    if (pricePerHour < 0) {
        throw new Error("El precio debe ser positivo")
    }
    return await createRoom(name, capacity, pricePerHour, description, imageUrl);
}