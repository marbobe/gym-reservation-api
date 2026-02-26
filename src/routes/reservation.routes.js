import { Router } from "express";
import { create, getAll, cancel } from "../controllers/reservation.controller.js";

const router = Router();

/**
 * @swagger
 * /api/v1/reservations:
 *   get:
 *     summary: Obtiene todas las reservas
 *     description: Retorna una lista de reservas realizadas por los usuarios.
 *     tags:
 *       - Reservations
 *     responses:
 *       200:
 *         description: Lista de reservas obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   userEmail:
 *                     type: string
 *                     example: juan.perez@test.com
 *                   roomName:
 *                     type: string
 *                     example: Sala de Baile
 *                   status:
 *                     type: string
 *                     example: active
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/v1/reservations:
 *   post:
 *     summary: Crea una nueva reserva
 *     description: Reserva una sala para un usuario.
 *     tags:
 *       - Reservations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userEmail
 *               - roomId
 *               - userId
 *               - startTime
 *               - endTime
 *             properties:
 *               userEmail:
 *                 type: string
 *                 example: ana.gomez@test.com
 *               roomId:
 *                 type: integer
 *                 example: 2
 *               userId:
 *                 type: integer
 *                 example: 1
*               startTime:
 *                 type: date
 *                 example: 2026-03-01 12:06:00
 *               endTime:
 *                 type: date
 *                 example: 2026-03-01 12:07:00
 *     responses:
 *       201:
 *         description: Reserva creada correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', create);

/**
 * @swagger
 * /api/v1/reservations/{id}/cancel:
 *   patch:
 *     summary: Cancela una reserva
 *     description: Cancela una reserva existente por su ID.
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Reserva cancelada correctamente
 *       404:
 *         description: Reserva no encontrada
 */
router.patch('/:id/cancel', cancel);

export default router;
