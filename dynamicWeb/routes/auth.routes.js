import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { signIn ,createAccount} from '../controllers/auth.controller.js';

const router = Router();

router.post('/sign-in', asyncHandler(signIn));
router.post('/admin/create-account', asyncHandler(createAccount));
export default router;
