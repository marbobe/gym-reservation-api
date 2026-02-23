import express from 'express';
import 'dotenv/config';
import { dbPool } from './config/db.js'
import { initDatabase } from './config/init_db.js';
import roomRoutes from './routes/room.routes.js';
import reservationRoutes from './routes/reservation.routes.js';

const app = express();

app.use(express.json());

try {
    await dbPool.query('SELECT 1+1 AS result');
    console.log('conexión a DB MySQL establecida con exito')

    await initDatabase();

    app.use('/api/rooms', roomRoutes);

    app.use('/api/reservations', reservationRoutes)

    app.listen(process.env.PORT, () => {
        console.log(`App listening port ${process.env.PORT}`)
    });
} catch (error) {
    console.error('Error al conextar con la base de datos: ', error)
    process.exit(1);
}


