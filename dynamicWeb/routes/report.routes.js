import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { createReport, getAllReports,getReportById,getReportFilter,getReportForMap,handleReport } from '../controllers/report.controller.js';
import { authentication } from '../middlewares/authorization.js';
import {uploads} from '../utils/cloudinary.js';
const router = Router();

router.post('/', uploads.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]),  asyncHandler(createReport));
router.get('/',asyncHandler(authentication), asyncHandler(getAllReports));
router.get('/getId/:id',asyncHandler(authentication), asyncHandler(getReportById));
router.put('/handle-report/:id', asyncHandler(handleReport));
router.get('/filter', asyncHandler(getReportFilter));
router.get('/map', asyncHandler(getReportForMap));
export default router;
