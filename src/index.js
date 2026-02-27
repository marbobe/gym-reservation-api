import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import roomRoutes from './routes/room.routes.js';
import reservationRoutes from './routes/reservation.routes.js';

import { setupSwagger } from './config/swagger.js';
import { prisma } from './config/prisma.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/reservations', reservationRoutes)
setupSwagger(app);

(async () => {
    try {
        await prisma.$connect();
        console.log('✅ Conexión a la base de datos MySQL establecida con éxito mediante Prisma.');


        app.listen(process.env.PORT, () => {
            console.log(`✅ App listening port ${process.env.PORT}`)
        });
    } catch (error) {
        console.error('❌ Error al conextar con la base de datos: ', error)
        process.exit(1);
    }
})();


