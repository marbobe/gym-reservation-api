import mockData from '../../prisma/mockData.json' with {type: "json"};
import { prisma } from '../config/prisma.js';

/**
 * devuelve la base de datos al estado original con los datos de mockData
 * @returns 1 si ha funcionado
 */
export const restoreDatabase = async () => {
    await prisma.reservation.deleteMany();
    await prisma.room.deleteMany();

    await prisma.room.createMany({
        data: mockData.rooms
    });
    await prisma.reservation.createMany({
        data: mockData.reservations
    });

    return 1;
}