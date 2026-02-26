import { Router } from "express";
import { create, getAll } from "../controllers/room.controller.js";

const router = Router();

/**
 * @swagger
 * /api/v1/rooms:
 *   get:
 *     summary: Obtiene todas las salas
 *     description: Retorna una lista de todas las salas disponibles.
 *     tags:
 *       - Rooms
 *     responses:
 *       200:
 *         description: Lista de salas obtenida con éxito
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
 *                   name:
 *                     type: string
 *                     example: Sala de Baile
 *                   capacity:
 *                     type: integer
 *                     example: 20
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/v1/rooms:
 *   post:
 *     summary: Crea una nueva sala
 *     description: Crea una sala de gimnasio o baile.
 *     tags:
 *       - Rooms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sala de Yoga
 *               capacity:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       201:
 *         description: Sala creada correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', create);

export default router;