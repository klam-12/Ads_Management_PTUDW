import reportService from '../services/report.service.js';
import {BadRequest,NotFoundResponse} from '../common/error.response.js';
import {PAGE_SIZE} from '../common/index.js';
import {SuccessResponse} from '../common/success.response.js';
import {paginateReport} from '../utils/pagination.js';
import Report from '../models/Report.js';
import {formatMongoDBDate} from '../utils/datetime.js';
import {sendEmail} from '../utils/sendEmail.js';
// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Upload from '../utils/upload.js';
dotenv.config();

const createReport = async(req, res, next) => {
  try{
  const body = req.body;
  const {reportType, fullName, email, phoneNumber, reportContent, type, lat, lng, isHandler,address,ward,district} = body;
  console.log(123,req.files['image1'] )
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
    isHandler: isHandler || false,
    address: body.address || '',
     image1 : req.files['image1'] ? req.files['image1'][0].filename : '',
     image2 : req.files['image2'] ? req.files['image2'][0].filename : ''

  }
  if (data.image1 ) {
    const uploadedResponse = await Upload.uploadFile(req.files['image1'][0].path).catch((error) => {});
    data.image1 = uploadedResponse.secure_url;

  }
  if (data.image2 ) {
    const uploadedResponse = await Upload.uploadFile(req.files['image2'][0].path).catch((error) => {});
    data.image2 = uploadedResponse.secure_url;
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
        isProcess: report.isHandled,
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
const handleReport = async (req, res, next) => {
  const id = req.params.id;
  const {handleContent,email,address,fullName} = req.body
  const report = await reportService.handleReport(id,handleContent);
  console.log(report)
  const subject = '[Ads Management System)_G5] Your report has been handled'
  const text = `<p>Chào ${fullName},</p>

  <p>Cán bộ Phường đã xử lý xong báo cáo của bạn được gửi ở địa chỉ ${address}. Vui lòng xem lại báo cáo của mình để thấy thêm thông tin về cách thức xử lý.</p>

  <p>Sau đây là cách thức xử lý cho báo cáo của bạn:</p>

  <p >Nội dung: <strong> ${handleContent}</strong></p>

  <p>Cảm ơn bạn đã cung cấp thông tin này.</p>

  <p>Trân trọng,</p>
  <p>Ads Management System_G5</p>`

  try {
    await sendEmail(email, subject, text);
    return res.json({
      message: 'Report handled successfully'
    })
} catch
(err) {
  return res.json(err)
}
}

export {createReport, getAllReports,getReportFilter,getReportById,getReportForMap,handleReport};