

import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { createRequest,getRequestById } from '../controllers/request.controller.js';
import { authentication,checkRoles } from '../middlewares/authorization.js';
import {uploads} from '../utils/cloudinary.js';
const router = Router();

// router.get('/', asyncHandler(getAdsWithSetPoint));
router.post('/', uploads.single('image'), (createRequest))
router.get('/objects', asyncHandler(getRequestById));

export default router;
