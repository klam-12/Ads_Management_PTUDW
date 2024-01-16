import setpointService from "../services/setpoint.service.js";
import { SuccessResponse } from '../common/success.response.js';
import { NotFoundResponse } from '../common/error.response.js';
import {toAddress} from '../utils/map.js'
import {paginateReport} from '../utils/pagination.js';
import SetPoint from "../models/SetPoint.js";
import Upload from '../utils/upload.js';
import {PAGE_SIZE} from '../common/index.js';
const getSetPoint = async (req, res, next) => {
  const page = parseInt(req.query.page) >= 1 ? parseInt(req.query.page) : 1;
  const limit = PAGE_SIZE;
  let district, ward
  const authUser = req.session.authUser
  console.log(authUser)
  if (authUser.role === 'Cán bộ Phường'){
    district = authUser.district
    ward = authUser.ward
  }
  else if (authUser.role === 'Cán bộ Quận'){
    district = authUser.district
  }
  console.log(district, ward)
  const result = await paginateReport(SetPoint, parseInt(page), parseInt(limit),"district", district, "ward", ward);
  if (!result) {
      throw new NotFoundResponse('Product not found');
  }
  console.log(result)
  return res.render('vwAdmin/vwDepartment/spaceList', {
    list:result.results.map(setpoint => {
      setpoint = setpoint.toObject()
      return {
        _id: setpoint._id,
        address: setpoint.address,
        typeofLocation: setpoint.typeofLocation,
        adsFormat: setpoint.adsFormat,
        isPlanned: setpoint.isPlanned,
        image: setpoint.image,
        address: setpoint.address,
        ward: setpoint.ward,
        district: setpoint.district,
        lat: setpoint.lat,
        lng: setpoint.lng
      };
    }),
    page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      totalDocs: result.totalDocs
  })
} 
const getSetPointFilter = async (req, res, next) => {
  const page = parseInt(req.query.page) >= 1 ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) > 1 ? parseInt(req.query.limit) : PAGE_SIZE;
    const district = req.query.district ? req.query.district : null
    const ward = req.query.ward? req.query.ward : null
  const result = await paginateReport(SetPoint, parseInt(page), parseInt(limit),"district", district, "ward", ward);
  if (!result) {
      throw new NotFoundResponse('Product not found');
  }
  
  return res.json({
    list: result.results.map(setpoint => {
    setpoint = setpoint.toObject()
    return {
      _id: setpoint._id,
      address: setpoint.address,
      typeofLocation: setpoint.typeofLocation,
      adsFormat: setpoint.adsFormat,
      isPlanned: setpoint.isPlanned,
      image: setpoint.image,
      address: setpoint.address,
      ward: setpoint.ward,
      district: setpoint.district,
      lat: setpoint.lat,
      lng: setpoint.lng
    };
  })})
} 

const createSetPoint = async (req, res, next) => {
  const body = req.body || {};
    if (body && Object.keys(body).length === 0) {
        // throw new BadRequest();
    }



    let setpoint = {
        address: body.address || undefined,
        typeofLocation: body.typeofLocation,
        adsFormat: body.adsFormat,
        isPlanned: body.isPlanned || false,
        image: req.file?.filename || undefined,
        district: body.district || undefined,
        ward: body.ward || undefined,
        lat: body.lat,
        lng: body.lng
    }
    if (setpoint.image) {
      console.log(req.file)
      const uploadedResponse = await Upload.uploadFile(req.file.path).catch((error) => {console.log(error)});
      console.log(uploadedResponse)
      setpoint.image = uploadedResponse.secure_url;
      if (uploadedResponse.secure_url) {
          const {address,ward,district} = await toAddress(body.lat, body.lng)
          console.log(address, ward, district)
          setpoint.address = address
          setpoint.ward = ward
          setpoint.district = district
          const product = await setpointService.createSetpoint(setpoint);
          return new SuccessResponse({
              metadata: product,
          }).send(req, res);
      } else {
          // throw new UnprocessableContentResponse('Image is wrong');
      }
    }
    return new SuccessResponse({
        metadata: setpoint,
    }).send(req,res)
      
}
export { getSetPoint,getSetPointFilter,createSetPoint };
