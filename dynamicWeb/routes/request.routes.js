

import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { createRequest } from '../controllers/request.controller.js';
import { authentication,checkRoles } from '../middlewares/authorization.js';

const router = Router();

// router.get('/', asyncHandler(getAdsWithSetPoint));
router.post('/',asyncHandler(createRequest))


export default router;
