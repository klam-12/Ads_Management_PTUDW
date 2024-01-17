import reportService from '../services/report.service.js';
import {BadRequest,NotFoundResponse} from '../common/error.response.js';
import {PAGE_SIZE} from '../common/index.js';
import {SuccessResponse} from '../common/success.response.js';
import {paginateReport} from '../utils/pagination.js';
import Report from '../models/Report.js';
import {formatMongoDBDate} from '../utils/datetime.js';
const createReport = (req, res, next) => {
  try{
  const body = req.body;
  const {reportType, fullName, email, phoneNumber, reportContent, type, lat, lng, isHandler,address,ward,district} = body;
  const data = {
    reportType,
    fullName,
    email,
    phoneNumber,
    reportContent,
    type,
    lat,
    lng,
    address: body.address || '',
    ward,
    district,
    isHandler: isHandler || false
  }
  const report = reportService.createReport(data);
  if (!report) {
    throw new BadRequest('Create report failed');
  }
  const response = {
    message: 'Report created successfully',
    metadata: report
  }
  return res.json(response);
}
catch(error){
  throw BadRequest(error.message)
}
}

const getReportFilter = async (req, res, next) => {
  console.log(req.query)
  try{
    const page = parseInt(req.query.page) >= 1 ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) > 1 ? parseInt(req.query.limit) : PAGE_SIZE;
    const district = req.query.district ? req.query.district : null
    const ward = req.query.ward? req.query.ward : null
    console.log(123, district, ward)
    const result = await paginateReport(Report, parseInt(page), parseInt(limit),"district", district, "ward", ward);
    if (!result) {
        throw new NotFoundResponse('Product not found');
    }
    return res.json({

      list: result.results.map(data => {
        return {
          _id: data._id,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        reportType: data.reportType,
        address: data.address,
        quantity: data.quantity,
        width: data.width,
        height: data.height,
       type: data.type,
       reportContent: data.reportContent,
       isHandled: data.isHandled,
       createAt: formatMongoDBDate(data.createdAt),
        }
      }),
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      totalDocs: result.totalDocs
    });
  }
  catch(err){
    console.log(err)
    return res.json([])
  }
}
const getAllReports = async (req, res, next) => {
  let district, ward
  const authUser = req.session.authUser
  if (authUser.role === 'Cán bộ Phường'){
    district = authUser.district
    ward = authUser.ward
  }
  else if (authUser.role === 'Cán bộ Quận'){
    district = authUser.district
  }
    const page = parseInt(req.query.page) >= 1 ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) > 1 ? parseInt(req.query.limit) : PAGE_SIZE;

    const result = await paginateReport(Report, parseInt(page), parseInt(limit),"district", district, "ward", ward);
    if (!result) {
        throw new NotFoundResponse('Product not found');
    }
    return res.render('vwAdmin/vwDepartment/reportList', {
      list: result.results.map(data => {
        const date = new Date(data.createAt);
        console.log(date);
        return {
          _id: data._id,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        reportType: data.reportType,
        address: data.address,
        quantity: data.quantity,
        width: data.width,
        height: data.height,
       type: data.type,
       reportContent: data.reportContent,
       isHandled: data.isHandled,
       createAt: formatMongoDBDate(date.toString()),
        }
      }),
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      totalDocs: result.totalDocs
    })
}

const getReportById = async (req, res, next) => {
  const id = req.params.id;
  const report = await reportService.getReportById(id);
  if (!report) {
    throw new NotFoundResponse('Report not found');
  }
  return res.json(report);
}

const getReportForMap = async (req, res, next) => {
  const reports = await reportService.getAllReports();
  const result = reports.map((report) => {
    return {
        isProcess: report.isHandler,
        reportType: report.reportType,
        fullName: report.fullName,
        email: report.email,
        phoneNumber: report.phoneNumber,
        reportContent: report.reportContent,
        image1: report.image1 || null,
        image2: report.image2 || null,
        coordinates: [report.lng, report.lat]
    }
  })
  return res.json(result);
}

const editReportStatus = async (req, res, next) => {
  const id = req.params.id;
  const report = await reportService.editReportStatus(id);
  console.log(report)
  if (!report) {
    throw new NotFoundResponse('Report not found');
  }
  return res.json(report);
}

export {createReport, getAllReports,getReportFilter,getReportById,getReportForMap,editReportStatus};