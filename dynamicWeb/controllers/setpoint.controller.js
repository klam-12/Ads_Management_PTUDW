import setpointService from "../services/setpoint.service.js";
import { SuccessResponse } from '../common/success.response.js';
import { NotFoundResponse } from '../common/error.response.js';
import {toAddress} from '../utils/map.js'
import {paginateReport} from '../utils/pagination.js';
import SetPoint from "../models/SetPoint.js";
import Upload from '../utils/upload.js';
import {PAGE_SIZE} from '../common/index.js';
import adsService from '../services/advertisement.service.js';
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
  console.log(result.pageSize)
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
const createSetPoint = async (req, res, next) => {
  console.log("Setpoint")
    const body = req.body || {};

    console.log(req.file)
    let setpoint = {
      address: body.address,
      typeofLocation: body.typeofLocation,
      adsFormat: body.adsFormat,
      isPlanned: body.isPlanned === 'true', // Parse boolean
      image: req.file?.filename || undefined,
      district: body.district || undefined,
      ward: body.ward || undefined,
      lat: body.lat,
      lng: body.lng,
    };
    console.log(124,setpoint)
    if (setpoint.image) {
      // Handle image upload
      const uploadedResponse = await Upload.uploadFile(req.file.path).catch((error) => {});
      setpoint.image = uploadedResponse.secure_url;
      if (uploadedResponse.secure_url) {
        // Set additional location details based on coordinates
        const { address, ward, district } = await toAddress(body.lat, body.lng);

        console.log(setpoint)
        // Create setpoint in the database
        try{
        const createdSetpoint = await setpointService.createSetpoint(setpoint);
        console.log(createdSetpoint)
        return res.json(createdSetpoint ||{}) 
        }
        catch(error){console.log(error)}

      } else {
        // throw new UnprocessableContentResponse('Image upload failed');
      }
    }
    return res.json(setpoint ||{}) // setpoint;
    // return new SuccessResponse({
    //   metadata: setpoint,
    // }).send(req, res);

};

const getAllSetPoint = async (req, res, next) => {
  const setpoints = await setpointService.getAllSetPoint();
  const result = await Promise.all(setpoints.map(async (setpoint) => {
    const ads = await adsService.getAdsWithSetPoint(setpoint._id);
    
    const data = {
      address: setpoint.address,
      typeofLocation: setpoint.typeofLocation,
      AdsFormat: setpoint.adsFormat,
      isPlanned: setpoint.isPlanned,
      image: setpoint.image,
      qcInfo: ads.map((ad) => ({
        id: ad._id,
        image: ad.image,
        quantity: ad.quantity,
        width: ad.width,
        height: ad.height,
        typeofAds: ad.typeofAds,
      })),
    };
    const coordinates = [setpoint.lat, setpoint.lng];
    return {data, coordinates};
  }));

  const responseData = {
    list: result,
  }
  return res.json(responseData)
}

const deleteSetPointById = async (req, res, next) => {
  const id = req.params.id
  const deleteQC = await adsService.deleteAdsBySetPointId(id)
  const result = await setpointService.deleteSetPointById(id)
  return res.json({
    message: 'Delete setpoint successfully',
  })
}
export { getSetPoint,getSetPointFilter,createSetPoint, getAllSetPoint, deleteSetPointById,};
