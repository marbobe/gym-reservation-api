import express from 'express';
import 'dotenv/config';
import { dbPool } from './config/db.js'
import { initDatabase } from './config/init_db.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de Reservas de gimnasio funcionando');
});

try {
    await dbPool.query('SELECT 1+1 AS result');
    console.log('conexión a DB MySQL establecida con exito')

    await initDatabase();

    app.listen(process.env.PORT, () => {
        console.log(`App listening port ${process.env.PORT}`)
    });
} catch (error) {
    console.error('Error al conextar con la base de datos: ', error)
    process.exit(1);
}


