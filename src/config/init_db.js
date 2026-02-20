import { dbPool } from "./db.js";

export async function initDatabase() {
    try {
        await dbPool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

        `);

        await dbPool.query(`
            CREATE TABLE IF NOT EXISTS rooms(
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                capacity INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
        `);

        await dbPool.query(`
            CREATE TABLE IF NOT EXISTS reservations(
                id INT AUTO_INCREMENT PRIMARY KEY,
                room_id INT NOT NULL,
                user_id INT NOT NULL,
                start_time DATETIME NOT NULL,
                end_time DATETIME NOT NULL,
                status ENUM('active', 'cancelled') DEFAULT 'active',
                FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        console.log('Tablas creadas correctamente')
    } catch (error) {
        console.log('Error en la creación de las tablas', error)
    }
}