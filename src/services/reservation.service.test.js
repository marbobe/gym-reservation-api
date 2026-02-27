import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeReservation, getReservations, cancelReservation } from './reservation.service.js';

import * as reservationRepository from '../repositories/reservation.repository.js';

vi.mock('../repositories/reservation.repository.js');

describe('Reservation Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('makeReservation', () => {

        it('debería lanzar un error si la fecha de inicio es posterior o igual a la de fin', async () => {
            const roomId = 1;
            const userId = 1;
            const startTime = '2026-03-01 12:00:00';
            const endTime = '2026-03-01 10:00:00';

            await expect(makeReservation(roomId, userId, startTime, endTime))
                .rejects
                .toThrow('La hora de fin debe ser estrictamente posterior a la hora de inicio');

            expect(reservationRepository.checkOverlap).not.toHaveBeenCalled()
        });

        it('Debería lanzar un error si la sala ya está ocupado en ese horario', async () => {
            const roomId = 1;
            const userId = 1;
            const startTime = '2026-03-01 10:00:00';
            const endTime = '2026-03-01 12:00:00';

            vi.mocked(reservationRepository.checkOverlap).mockResolvedValue(true);

            await expect(makeReservation(roomId, userId, startTime, endTime))
                .rejects
                .toThrow('La sala ya está reservada en ese horario. Por favor, elige otro.')

            expect(reservationRepository.checkOverlap).toHaveBeenCalled()
        });

        it('Debería crear la reserva y devolver el ID si los datos son correctos y no hay solapamiento', async () => {
            const roomId = 1;
            const userId = 1;
            const startTime = '2026-03-01 10:00:00';
            const endTime = '2026-03-01 12:00:00';

            vi.mocked(reservationRepository.checkOverlap).mockResolvedValue(false);
            vi.mocked(reservationRepository.createReservation).mockResolvedValue(99);

            const resultId = await makeReservation(roomId, userId, startTime, endTime);

            expect(resultId).toBe(99);

            expect(reservationRepository.checkOverlap).toHaveBeenCalledOnce();
            expect(reservationRepository.createReservation).toHaveBeenCalledOnce();
        });
    });

    describe('getReservations', () => {

        it('Debería obtener una lista de reservas filtradas por roomId', async () => {
            const roomId = 1;
            const mockReservations = [{ id: 1, roomId: 1 }, { id: 2, roomId: 1 }];

            vi.mocked(reservationRepository.getAllReservations).mockResolvedValue(mockReservations);

            const reservationsById = await getReservations(roomId);

            expect(reservationsById).toEqual(mockReservations);
            expect(reservationRepository.getAllReservations).toHaveBeenCalledWith(roomId);
        });

        it('Debería obtener una lista de todas las reservas si no hay filtro', async () => {
            const mockReservations = [{ id: 1, roomId: 1 }, { id: 2, roomId: 1 }, { id: 3, roomId: 2 }];

            vi.mocked(reservationRepository.getAllReservations).mockResolvedValue(mockReservations);

            const reservations = await getReservations();

            expect(reservations).toEqual(mockReservations);
            expect(reservationRepository.getAllReservations).toHaveBeenCalledOnce();
        });
    });

    describe('cancelReservation', () => {
        it('Debería lanzar un error si la reserva no se ha encontrado o ya estaba cancelada', async () => {
            const reservationId = 2;

            vi.mocked(reservationRepository.cancelReservationById).mockResolvedValue(0);

            await expect(cancelReservation(reservationId))
                .rejects
                .toThrow('Reserva no encotrada o ya cancelada');

            expect(reservationRepository.cancelReservationById).toHaveBeenCalled();
        })


        it('Debería devolver true si la reserva se cancela correctamente', async () => {
            const reservationId = 2;

            vi.mocked(reservationRepository.cancelReservationById).mockResolvedValue(reservationId);

            const cancelled = await cancelReservation(reservationId);

            expect(cancelled).toBe(true);
            expect(reservationRepository.cancelReservationById).toHaveBeenCalledOnce();
        })
    })
});