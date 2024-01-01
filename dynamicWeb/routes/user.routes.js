import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import {getMe,editProfile} from '../controllers/user.controller.js';
import {verifyToken, checkRoles} from '../middlewares/authorization.js';
const router = Router();

router.get('/me',asyncHandler(verifyToken),asyncHandler(getMe));
router.put('/me',asyncHandler(verifyToken),asyncHandler(editProfile));
export default router;
