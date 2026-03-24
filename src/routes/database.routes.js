import { Router } from "express";
import { restauration } from "../controllers/database.controller.js";

const router = Router();

/**
 * @swagger
 * /api/v1/database/reset:
 *  post:
 *      summary: Restablece la base de datos (Entorno de pruebas / Portfolio)
 *      description: Borra todas las reservas y salas actuales, y vuelve a poblar la base de datos con los datos iniciales (mockData). ¡Siéntete libre de probar la API, borrar y editar, y usa este botón para dejarlo todo como nuevo!
 *      tags:
 *          - Database
 *      responses:
 *          200:
 *              description: Base de datos restablecida correctamente.
 *          500:
 *              description: Error interno del servidor al intentar restablecer los datos.
 */
router.post('/reset', restauration);

export default router;