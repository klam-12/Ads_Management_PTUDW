import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { getSetPoint,getSetPointFilter } from '../controllers/setpoint.controller.js';
import { authentication } from '../middlewares/authorization.js';

const router = Router();

router.get('/',asyncHandler(authentication), getSetPoint);
router.get('/filter', asyncHandler(getSetPointFilter));
export default router;
