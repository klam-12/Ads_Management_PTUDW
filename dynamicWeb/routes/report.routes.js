import { Router } from 'express';
import asyncHandler from '../middlewares/asyncHandler.js';
import { createReport, getAllReports,getReportById,getReportFilter } from '../controllers/report.controller.js';
import { authentication } from '../middlewares/authorization.js';
const router = Router();

router.post('/', asyncHandler(createReport));
router.get('/',asyncHandler(authentication), asyncHandler(getAllReports));
router.get('/getId/:id',asyncHandler(authentication), asyncHandler(getReportById));
router.get('/filter',asyncHandler(authentication), getReportFilter);

export default router;
