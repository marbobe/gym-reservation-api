import { Router } from "express";
import { create, getAll, cancel, edit, getById } from "../controllers/reservation.controller.js";

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
 *                   roomId:
 *                     type: integer
 *                     example: 1
 *                   userId:
 *                     type: integer
 *                     example: 101
 *                   startTime:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-03-01T10:00:00.000Z
 *                   endTime:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-03-01T11:30:00.000Z
 *                   status:
 *                     type: string
 *                     example: active
 *                   room:
 *                     type: object
 *                     properties:
 *                         name:
 *                           type: string
 *                           example: Sala de Baile
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/v1/reservations/{id}:
 *   get:
 *     summary: Obtiene una reserva
 *     description: Devuelve una reserva en función del id.
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID de la reserva a buscar
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: reserva encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 userEmail:
 *                   type: string
 *                   example: juan.perez@test.com
 *                 roomName:
 *                   type: string
 *                   example: Sala de Baile
 *                 startTime:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-03-01T10:00:00.000Z
 *                 endTime:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-03-01T11:30:00.000Z
 *                 status:
 *                   type: string
 *                   example: active
 */
router.get('/:id', getById);

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
 *               - roomId
 *               - userId
 *               - startTime
 *               - endTime
 *             properties:
 *               roomId:
 *                 type: integer
 *                 example: 2
 *               userId:
 *                 type: integer
 *                 example: 1
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: 2028-03-01 12:06:00
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: 2028-03-01 12:07:00
 *     responses:
 *       201:
 *         description: Reserva creada correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', create);

/**
 * @swagger
 * /api/v1/reservations/{id}:
 *   patch:
 *     summary: Edita una reserva
 *     description: Edita los datos de una reserva ya existente. Solo necesitas enviar los campos que quieres cambiar.
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID de la reserva a editar
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: 2027-04-15T10:00:00Z
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: 2027-04-15T11:30:00Z
 *     responses:
 *       200:
 *         description: Reserva editada correctamente
 *       400:
 *         description: Datos inválidos o error en la petición
 *       404:
 *         description: La reserva que intentas editar no existe
 */
router.patch('/:id', edit);

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
