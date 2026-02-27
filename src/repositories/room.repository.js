import { prisma } from '../config/prisma.js';

/**
 * Obtiene todas las salas registradas en el sistema.
 * @returns {Promise<Array<Object>>} Lista de objetos de sala (id, name, capacity, createdAt).
 */
export const getAllRooms = async () => {
    return await prisma.room.findMany();
}


/**
 * Crea una nueva sala en la base de datos.
 * @param {string} name - Nombre de la sala.
 * @param {number} capacity - Capacidad máxima de la sala.
 * @returns {Promise<number>} El ID de la sala recién insertada.
 */
export const createRoom = async (name, capacity) => {
    const newRoom = await prisma.room.create({
        data: {
            name: name,
            capacity: capacity
        }
    });
    return newRoom.id;
}
