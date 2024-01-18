

import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { createRequest,handleReport } from '../controllers/request.controller.js';
import { authentication,checkRoles } from '../middlewares/authorization.js';
import {uploads} from '../utils/cloudinary.js';
const router = Router();

// router.get('/', asyncHandler(getAdsWithSetPoint));
router.post('/', uploads.single('image'), (createRequest))


export default router;
