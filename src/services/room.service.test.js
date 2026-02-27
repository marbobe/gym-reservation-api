import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRooms, addRoom } from './room.service.js';

import * as roomRepository from '../repositories/room.repository.js';

vi.mock('../repositories/room.repository.js');

describe('Room Service', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getRooms', () => {
        it('Debería obtener todas las salas disponibles', async () => {
            const mockRooms = [{ id: 1, name: 'sala de baile', capacity: 20 }, { id: 2, name: 'sala de yoga', capacity: 50 }];

            vi.mocked(roomRepository.getAllRooms).mockResolvedValue(mockRooms);

            const rooms = await getRooms();

            expect(rooms).toEqual(mockRooms);
            expect(roomRepository.getAllRooms).toHaveBeenCalledOnce();
        });
    });

    describe('addRoom', () => {
        it('Debería lanzar un error si la capacidad de la sala es menor a 1', async () => {
            const name = "Sala de Baile";
            const capacity = 0;

            await expect(addRoom(name, capacity))
                .rejects
                .toThrow("La capacidad debe ser mayor a 0");

            expect(roomRepository.createRoom).not.toHaveBeenCalled();
        })

        it('Debería registrar una nueva sala', async () => {
            const name = "Sala de Baile";
            const capacity = 20;
            const mockInsertId = 33;

            vi.mocked(roomRepository.createRoom).mockResolvedValue(mockInsertId)

            const createdRoom = await addRoom(name, capacity);

            expect(createdRoom).toEqual(mockInsertId)
            expect(roomRepository.createRoom).toHaveBeenCalledOnce();
            expect(roomRepository.createRoom).toHaveBeenCalledWith(name, capacity);
        });

    })

});