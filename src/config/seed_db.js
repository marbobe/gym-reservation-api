import fs from 'fs/promises';
import { dbPool } from './db.js';

export const seedDatabase = async () => {
    try {
        const [existingUsers] = await dbPool.query('SELECT COUNT(*) as count FROM users');

        if (existingUsers[0].count > 0) {
            console.log('✅ Seeders: La base de datos ya tiene datos, omitiendo inserción.');
            return;
        }

        const fileContent = await fs.readFile(process.cwd() + '/src/config/mockData.json', 'utf-8');
        const data = JSON.parse(fileContent);

        for (const user of data.users) {
            await dbPool.query(
                'INSERT INTO users (name, email) VALUES (?,?)', [user.name, user.email]
            );
        }

        for (const room of data.rooms) {
            await dbPool.query(
                'INSERT INTO rooms (name, capacity) VALUES (?,?)', [room.name, room.capacity]
            );
        }

        console.log('✅ Datos de prueba (Seeders) inyectados desde mockData.json correctamente.');
    } catch (error) {
        console.error('❌ Error ejecutando los seeders:', error);
    }
};