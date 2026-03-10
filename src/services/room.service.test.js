import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRooms, addRoom, editRoom, getRoom } from './room.service.js';

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

        it('Debería lanzar un error si el precio es negativo', async () => {
            const name = "Sala de yoga";
            const capacity = 2
            const pricePerHour = -1;

            await expect(addRoom(name, capacity, pricePerHour))
                .rejects
                .toThrow("El precio debe ser positivo");

            expect(roomRepository.createRoom).not.toHaveBeenCalled();
        })

        it('Debería registrar una nueva sala', async () => {
            const name = "Sala de Baile";
            const capacity = 20;
            const pricePerHour = 15;
            const description = "Descripción de la sala";
            const imageUrl = "Dirección de la imagen"
            const mockInsertId = 53;

            vi.mocked(roomRepository.createRoom).mockResolvedValue(mockInsertId)

            const createdRoom = await addRoom(name, capacity, pricePerHour, description, imageUrl);

            expect(createdRoom).toEqual(mockInsertId)
            expect(roomRepository.createRoom).toHaveBeenCalledOnce();
            expect(roomRepository.createRoom).toHaveBeenCalledWith(name, capacity, pricePerHour, description, imageUrl);
        });

    })

    describe('editRoom', () => {
        it('Debería editar la sala', async () => {
            const roomId = 1;
            const dataToUpdate = { pricePerHour: 56 };
            const mockUpdatedRoom = {
                id: 1,
                name: "Sala de Baile",
                capacity: 20,
                pricePerHour: 56
            };

            vi.mocked(roomRepository.editRoomById).mockResolvedValue(mockUpdatedRoom);

            const editedRoom = await editRoom(roomId, dataToUpdate);

            expect(editedRoom).toEqual(mockUpdatedRoom);
            expect(roomRepository.editRoomById).toHaveBeenCalledOnce();
            expect(roomRepository.editRoomById).toHaveBeenCalledWith(roomId, dataToUpdate);
        })
    })

    describe('getRoom', () => {
        it('Debería encontrar la sala por su id', async () => {
            const roomId = 1;
            const mockRoom = {
                id: 1,
                name: "Sala de Baile",
                capacity: 20,
                pricePerHour: 15
            }

            vi.mocked(roomRepository.getRoomById).mockResolvedValue(mockRoom);

            const room = await getRoom(roomId);

            expect(room).toEqual(mockRoom);
            expect(roomRepository.getRoomById).toHaveBeenCalledOnce();
            expect(roomRepository.getRoomById).toHaveBeenCalledWith(roomId);

        })
    })

});