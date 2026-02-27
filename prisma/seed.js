import { prisma } from '../src/config/prisma.js';
import mockData from './mockData.json' with { type: "json" };

async function main() {
    console.log('✅ Iniciando el sembrado de la base de datos...');

    await prisma.reservation.deleteMany();
    await prisma.room.deleteMany();
    console.log('✅ Base de datos limpiada.');

    await prisma.room.createMany({
        data: mockData.rooms
    });
    console.log(`✅ Creadas ${mockData.rooms.length} salas.`);

    await prisma.reservation.createMany({
        data: mockData.reservations
    });
    console.log(`✅ Creadas ${mockData.reservations.length} reservas.`);

    console.log('✅ Sembrado completado con éxito.');
}


main()
    .catch((e) => {
        console.error('❌ Error durante el sembrado:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });