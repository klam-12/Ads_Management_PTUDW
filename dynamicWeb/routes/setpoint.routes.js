import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { getSetPoint,getSetPointFilter,createSetPoint,getAllSetPoint ,deleteSetPointById} from '../controllers/setpoint.controller.js';
import { authentication } from '../middlewares/authorization.js';
import {uploads} from '../utils/cloudinary.js';
const router = Router();
router.post('/create-setPoints', asyncHandler(uploads.single('image')), createSetPoint);
router.get('/',getSetPoint);
router.get('/filter', asyncHandler(getSetPointFilter));

router.get('/map',getAllSetPoint);
router.delete('/:id', asyncHandler(authentication), asyncHandler(deleteSetPointById));
export default router;
