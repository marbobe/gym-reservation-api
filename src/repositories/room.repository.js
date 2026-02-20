import { dbPool } from "../config/db.js";

export const getAllRooms = async () => {
    const [rows] = await dbPool.query('SELECT * FROM rooms');
    return rows;
}

export const createRoom = async (name, capacity) => {
    const [result] = await dbPool.query('INSERT INTO rooms (name, capacity) VALUES (?,?)', [name, capacity]);
    return result.insertId;
}