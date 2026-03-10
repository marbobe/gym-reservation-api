import { createRoom, getAllRooms, editRoomById, getRoomById, deleteRoomById } from "../repositories/room.repository.js";

/**
 * Obtiene todas las salas disponibles en el sistema.
 * @returns {Promise<Array>} Devuelve un array de objetos de tipo sala.
 */
export const getRooms = async () => {
    return await getAllRooms();
}

/**
 * Obtiene una sala por id
 * @param  {string | number} roomId - el ID de la sala
 * @returns {Promise<Object>} Devuelve el objeto de la sala
 */
export const getRoom = async (roomId) => {
    return await getRoomById(roomId);
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


/**
 * Modifica una sala ya creada
 * @param {string | number} roomId - el ID de la sala a editar
 * @param {Object} dataToUpdate - Objeto con datos a actualizar
 * @returns {Promise<Object>} - El objeto de la sala con los datos actualizados
 */
export const editRoom = async (roomId, dataToUpdate) => {
    return await editRoomById(roomId, dataToUpdate);
}

/**
 * Elimina una sala con soft delete.
 * @param {number} roomId - Id de la sala a eliminar.
 * @throws {Error} Si la sala no existe o ya estaba cancelada previamente.
 * @returns {Promise<boolean>} Devuelve true si el estado se cambió correctamente.
 */
export const deleteRoom = async (roomId) => {
    const deleted = await deleteRoomById(roomId);
    if (!deleted) {
        throw new Error('Reserva no encotrada o ya cancelada');
    }

    return true
}