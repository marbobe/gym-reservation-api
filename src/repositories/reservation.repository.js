import { dbPool } from "../config/db.js";

export const checkOverlap = async (roomId, startTime, endTime) => {
    const [rows] = await dbPool.query(`
        SELECT id FROM reservations
        WHERE room_id = ?
        AND status = 'active'
        AND start_time < ?
        AND end_time > ?
        `, [roomId, endTime, startTime]);

    return rows.length > 0;
}

export const createReservation = async (roomId, userId, startTime, endTime) => {
    const [result] = await dbPool.query(`
        INSERT INTO reservations (room_id, user_id, start_time, end_time) 
        VALUES (?,?,?,?)
        `, [roomId, userId, startTime, endTime]);

    return result.insertId;
}

export const getAllReservations = async (roomId) => {
    if (!roomId) {
        const [result] = await dbPool.query(`
            SELECT * FROM reservations
            `)
        return result
    }
    const [result] = await dbPool.query(`
        SELECT * FROM reservations WHERE room_id = ?
        `, [roomId])
    return result
}

export const cancelReservationById = async (reservationId) => {
    const [result] = await dbPool.query(`
        UPDATE reservations SET status = 'cancelled' WHERE id = ? 
        `, [reservationId])
    return result.affectedRows;
}
