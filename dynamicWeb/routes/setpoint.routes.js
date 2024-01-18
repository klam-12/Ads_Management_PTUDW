import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { getSetPoint,getSetPointFilter,createSetPoint,getAllSetPoint } from '../controllers/setpoint.controller.js';
import { authentication } from '../middlewares/authorization.js';
import {uploads} from '../utils/cloudinary.js';
const router = Router();
router.post('/create-setPoints', asyncHandler(uploads.single('image')), createSetPoint);
// router.post('/create-setPoints', async function (req, res, next) {
//   return res.json({})
// })
router.get('/',getSetPoint);
router.get('/filter', asyncHandler(getSetPointFilter));

router.get('/map',getAllSetPoint);
export default router;
