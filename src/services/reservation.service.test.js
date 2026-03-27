import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeReservation, getReservations, getReservation, editReservation, cancelReservation } from './reservation.service.js';

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

    describe('getReservation', () => {
        it('Debería devolver el objeto de la reserva con el id filtrado.', async () => {
            const reservationId = 3;
            const mockReservation = { id: 3, roomId: 1 }
            vi.mocked(reservationRepository.getReservationById).mockResolvedValue(mockReservation);

            const reservation = await getReservation(reservationId);

            expect(reservation).toEqual(mockReservation);
            expect(reservationRepository.getReservationById).toHaveBeenCalledOnce();
            expect(reservationRepository.getReservationById).toHaveBeenCalledWith(reservationId);
        })

    })

    describe('editReservation', () => {
        it('Debería lanzar error si la reserva que intentas editar ni existe', async () => {
            const reservaId = 2;

            vi.mocked(reservationRepository.getReservationById).mockResolvedValue(null);

            await expect(editReservation(reservaId))
                .rejects
                .toThrow('La reserva que intentas editar no existe.')

            expect(reservationRepository.getReservationById).toHaveBeenCalledOnce();
            expect(reservationRepository.editReservationById).not.toHaveBeenCalled();

        });

        it('Debería lanzar un error si las fechas proporcionadas no tienen un formato válido', async () => {
            const idReservation = 2;
            const mockReservation = { id: 2, startTime: '2026-03-02 14:00:00', endTime: '2026-03-02 10:00:00' };
            const dataToUpdate = { startTime: 'fechaFalsa1 ', endTime: 'fechaFalsa2' }

            vi.mocked(reservationRepository.getReservationById).mockResolvedValue(mockReservation);

            await expect(editReservation(idReservation, dataToUpdate))
                .rejects
                .toThrow('Las fechas proporcionadas no tienen un formato válido.')

            expect(reservationRepository.getReservationById).toHaveBeenCalledOnce();
            expect(reservationRepository.editReservationById).not.toHaveBeenCalled();
        });

        it('Debería lanzar error si la hora de fin es anterior a la de inicio', async () => {
            const idReservation = 2
            const mockReservation = { id: 2, startTime: '2026-03-02 14:00:00', endTime: '2026-03-02 10:00:00' };
            const dataToUpdate = { startTime: '2026-03-02 14:00:00', endTime: '2026-03-02 10:00:00' };

            vi.mocked(reservationRepository.getReservationById).mockResolvedValue(mockReservation)

            await expect(editReservation(idReservation, dataToUpdate))
                .rejects
                .toThrow('La hora de fin debe ser estrictamente posterior a la hora de inicio')

            expect(reservationRepository.getReservationById).toHaveBeenCalledOnce();
            expect(reservationRepository.editReservationById).not.toHaveBeenCalled();


        });

        it('Debería dar error si la sala ya está reservada en ese horario', async () => {
            const idReservation = 2
            const dataToUpdate = { startTime: '2026-03-02 08:00:00', endTime: '2026-03-02 10:00:00' };

            const mockReservation = { id: 2, startTime: '2026-03-02 14:00:00', endTime: '2026-03-02 10:00:00' };

            vi.mocked(reservationRepository.getReservationById).mockResolvedValue(mockReservation);
            vi.mocked(reservationRepository.checkOverlap).mockResolvedValue(true)

            await expect(editReservation(idReservation, dataToUpdate))
                .rejects
                .toThrow('La sala ya está reservada en ese horario. Por favor, elige otro.');

            expect(reservationRepository.getReservationById).toHaveBeenCalledOnce();
            expect(reservationRepository.checkOverlap).toHaveBeenCalledOnce();
            expect(reservationRepository.checkOverlap)
            expect(reservationRepository.editReservationById).not.toHaveBeenCalled();
        });

        it('Debería devolver el id de reserva con los datos a actualizar', async () => {
            const reservationId = 1;
            const dataToUpdate = { startTime: '2026-03-02 12:00:00', endTime: '2026-03-02 14:00:00' };
            const mockUpdatedReservation = { id: 1, startTime: '2026-03-02 12:00:00', endTime: '2026-03-02 14:00:00' }

            vi.mocked(reservationRepository.editReservationById).mockResolvedValue(mockUpdatedReservation);
            vi.mocked(reservationRepository.getReservationById).mockResolvedValue(mockUpdatedReservation);
            vi.mocked(reservationRepository.checkOverlap).mockResolvedValue(false)

            const editedReservation = await editReservation(reservationId, dataToUpdate);

            expect(editedReservation).toEqual(mockUpdatedReservation)
            expect(reservationRepository.editReservationById).toHaveBeenCalledOnce();
            expect(reservationRepository.editReservationById).toHaveBeenCalledWith(reservationId, dataToUpdate)
        });

    })

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