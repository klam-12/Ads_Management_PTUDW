
import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { createAds ,getAdsWithSetPoint,getAdsAll, getAdsFilter,deleteAdsById,changeAdsStatus} from '../controllers/advertisement.controller.js';
import { authentication,checkRoles } from '../middlewares/authorization.js';

const router = Router();

router.get('/', asyncHandler(getAdsWithSetPoint));
router.post('/',asyncHandler(createAds))
router.get('/request', asyncHandler(getAdsAll))
router.get('/request/filter', asyncHandler(getAdsFilter))
router.delete('/request/delete/:id', asyncHandler(deleteAdsById))
router.patch('/request/approve-license/:id', asyncHandler(changeAdsStatus))
export default router;
