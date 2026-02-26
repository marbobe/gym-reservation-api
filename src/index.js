import express from 'express';
import 'dotenv/config';
import { dbPool } from './config/db.js'
import { initDatabase } from './config/init_db.js';
import { seedDatabase } from './config/seed_db.js';

import roomRoutes from './routes/room.routes.js';
import reservationRoutes from './routes/reservation.routes.js';

import { setupSwagger } from './config/swagger.js';

const app = express();

app.use(express.json());

app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/reservations', reservationRoutes)
setupSwagger(app);

(async () => {
    try {
        await dbPool.query('SELECT 1+1 AS result');
        console.log('✅ Conexión a la base de datos MySQL establecida con éxito.')

        await initDatabase();
        await seedDatabase();

        app.listen(process.env.PORT, () => {
            console.log(`✅ App listening port ${process.env.PORT}`)
        });
    } catch (error) {
        console.error('❌ Error al conextar con la base de datos: ', error)
        process.exit(1);
    }
})();


