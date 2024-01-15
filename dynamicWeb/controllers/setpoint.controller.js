import setpointService from "../services/setpoint.service.js";
import { SuccessResponse } from '../common/success.response.js';
import { NotFoundResponse } from '../common/error.response.js';
import {toAddress} from '../utils/map.js'
import {paginateReport} from '../utils/pagination.js';
import SetPoint from "../models/SetPoint.js";
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


export { getSetPoint,getSetPointFilter };
