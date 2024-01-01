import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { getSetPoint } from '../controllers/setpoint.controller.js';

const router = Router();

router.get('/', asyncHandler(getSetPoint));

export default router;
