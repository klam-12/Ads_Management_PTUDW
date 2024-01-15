import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { getSetPoint,getSetPointFilter } from '../controllers/setpoint.controller.js';

const router = Router();

router.get('/', asyncHandler(getSetPoint));
router.get('/filter', asyncHandler(getSetPointFilter));
export default router;
