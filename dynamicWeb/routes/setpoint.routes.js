import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { getSetPoint,getSetPointFilter,createSetPoint,getAllSetPoint } from '../controllers/setpoint.controller.js';
import { authentication } from '../middlewares/authorization.js';
import {uploads} from '../utils/cloudinary.js';
const router = Router();

router.get('/',asyncHandler(authentication), getSetPoint);
router.get('/filter', asyncHandler(getSetPointFilter));
router.post('/', asyncHandler(authentication), uploads.single('image'), createSetPoint);
router.get('/map',asyncHandler(authentication), getAllSetPoint);
export default router;
