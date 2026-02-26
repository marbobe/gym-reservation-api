import { Router } from "express";
import { create, getAll, cancel } from "../controllers/reservation.controller.js";

const router = Router();

router.post('/', create);
router.get('/', getAll);
router.patch('/:id/cancel', cancel);

export default router;
