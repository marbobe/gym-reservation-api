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
 *               - pricePerHour
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sala de Fitness
 *               capacity:
 *                 type: integer
 *                 example: 35
 *               pricePerHour:
 *                 type: number
 *                 format: float
 *                 example: 18
 *               description:
 *                 type: string
 *                 example: Un espacio climatizado y sistema de sonido de ambiente. Incluye esterillas y pesas.
 *               imageUrl:
 *                 type: string
 *                 example: https://plus.unsplash.com/premium_photo-1666736569193-6b2a79b6e71a?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
 *     responses:
 *       201:
 *         description: Sala creada correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', create);

export default router;