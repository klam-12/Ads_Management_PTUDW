import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import {getMe,editProfile} from '../controllers/user.controller.js';
import {authentication, checkRoles} from '../middlewares/authorization.js';
const router = Router();

router.get('/me',asyncHandler(authentication),asyncHandler(getMe));
router.post('/me',asyncHandler(authentication),asyncHandler(editProfile));
export default router;
