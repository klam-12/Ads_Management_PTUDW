import advertisementService from '../services/advertisement.service.js';
import companyService from '../services/company.service.js';
import setpointService from '../services/setpoint.service.js';
import {formatMongoDBDate} from '../utils/datetime.js';
import {paginateAds} from '../utils/pagination.js';
import Advertisement from '../models/Advertisement.js';
import {PAGE_SIZE} from '../common/index.js';
import Upload from '../utils/upload.js';
import { SuccessResponse } from '../common/success.response.js';
import { NotFoundResponse } from '../common/error.response.js';
import {toAddress} from '../utils/map.js'
const getAdsWithSetPoint = async (req, res) => {
  const id_setpoint = req.query.id_setpoint;
  const list = await advertisementService.getAdsWithSetPoint(id_setpoint);
  return res.json(list)
}

const createAds = async(req,res,next) =>{
  const body = req.body;
  const company = {
    name: body.nameCompany,
    address: body.address,
    phoneNumber: body.phoneNumber,
    email: body.email,
  }
  const newCompany = await companyService.createCompany(company);
  const ads = {
    typeofAds: body.typeofAds,
    width: body.width,
    height: body.height,
    quantity: body.quantity,
    image: req.file?.filename || undefined,
    companyId: body.company_id,
    startDate: new Date(body.startDate.split('/').reverse().join('-')),//; new Date(body.startDate) || Date.now(),
    expireDate: new Date(body.expireDate.split('/').reverse().join('-')),//new Date(body.expireDate) || null,
    id_setpoint: body.id_setpoint,
    isLicensed: body.isLicensed || false, 
    companyId: newCompany._id
  }
  if (ads.image) {
    const uploadedResponse = await Upload.uploadFile(req.file.path).catch((error) => {console.log(error)});
    ads.image = uploadedResponse.secure_url;
    if (uploadedResponse.secure_url) {
        const result = await advertisementService.createAds(ads);
        return new SuccessResponse({
          message: 'Advertisement created successfully.',
            metadata: result,
        }).send(req, res);
    } else {
    }
  }
  return res.json(ads)
}

const deleteAdsById = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Call the advertisement service to delete the ad by ID
    const result = await advertisementService.deleteAdsById(id);
    res.status(200).json({ message: 'Advertisement deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete advertisement.' });
    console.error('Error deleting advertisement:', error);
  }
};
const getAdsAll = async (req, res, next) => {
  try {
    let district, ward
    const authUser = req.session.authUser
    if (authUser.role === 'Cán bộ Phường'){
      district = authUser.district
      ward = authUser.ward
    }
    else if (authUser.role === 'Cán bộ Quận'){
      district = authUser.district
    }
    else{
      district = null
      ward = null
    }
    const page = parseInt(req.query.page) >= 1 ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) > 1 ? parseInt(req.query.limit) : PAGE_SIZE;

    const result = await paginateAds(Advertisement, page, limit, district, ward);
    return res.render('vwAdmin/vwDepartment/licenseList', {
      licenseList:  result.results.map(advertisement => {
            return {
                _id: advertisement._id,
                typeofAds: advertisement.typeofAds,
                width: advertisement.width,
                height: advertisement.height,
                quantity: advertisement.quantity,
                startDate: formatMongoDBDate(advertisement.startDate),
                setpointInfo: {
                  image: advertisement.setpointInfo.image,
                    district: advertisement.setpointInfo.district,
                    ward: advertisement.setpointInfo.ward,
                    address: advertisement.setpointInfo.address,
                    
                    lat: advertisement.setpointInfo.lat,
                    lng: advertisement.setpointInfo.lng,
                    typeofLocation: advertisement.setpointInfo.typeofLocation,
                    adsFormat: advertisement.setpointInfo.adsFormat,
                    isPlanned: advertisement.setpointInfo.isPlanned,
                    
                },
                companyInfo: {
                    _id: advertisement.companyId,
                    name: advertisement.companyInfo.name,
                    email: advertisement.companyInfo.email,
                    phoneNumber: advertisement.companyInfo.phoneNumber,
                    address: advertisement.companyInfo.address,
                    createdAt: advertisement.companyInfo.createdAt,
                    updatedAt: advertisement.companyInfo.updatedAt,
                    __v: advertisement.companyInfo.__v
                },
                expireDate: formatMongoDBDate(advertisement.expireDate),
                isLicensed: advertisement.isLicensed,
                image: advertisement.image
            };
        }),
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      totalDocs: result.totalDocs
    });
} catch (err) {
    console.error(err);
    return res.json([]);
}
  
}


const getAdsFilter = async (req, res, next) => {
  try {
      const page = parseInt(req.query.page) >= 1 ? parseInt(req.query.page) : 1;
      const limit = parseInt(req.query.limit) > 1 ? parseInt(req.query.limit) : PAGE_SIZE;
      let district = req.query.district && req.query.district !== 'Quận' ? req.query.district : null;
      let ward = req.query.ward && req.query.ward !== 'Phường' ? req.query.ward : null;
      const user = req.session.authUser
    if (user.role === 'Cán bộ Phường'){
      district = user.district
      ward = user.ward
    }
    else if (user.role === 'Cán bộ Quận'){
      district = user.district
    }
    
      const result = await paginateAds(Advertisement, page, limit, district, ward);
      return res.json({
        licenseList: result.results.map(advertisement => {
              return {
                  _id: advertisement._id,
                  typeofAds: advertisement.typeofAds,
                  width: advertisement.width,
                  height: advertisement.height,
                  quantity: advertisement.quantity,
                  startDate: formatMongoDBDate(advertisement.startDate),
                  setpointInfo: {
                    image: advertisement.setpointInfo.image,
                      district: advertisement.setpointInfo.district,
                      ward: advertisement.setpointInfo.ward,
                      address: advertisement.setpointInfo.address,
                      
                      lat: advertisement.setpointInfo.lat,
                      lng: advertisement.setpointInfo.lng,
                      typeofLocation: advertisement.setpointInfo.typeofLocation,
                      adsFormat: advertisement.setpointInfo.adsFormat,
                      isPlanned: advertisement.setpointInfo.isPlanned,
                      
                  },
                  companyInfo: {
                      _id: advertisement.companyId,
                      name: advertisement.companyInfo.name,
                      email: advertisement.companyInfo.email,
                      phoneNumber: advertisement.companyInfo.phoneNumber,
                      address: advertisement.companyInfo.address,
                      createdAt: advertisement.companyInfo.createdAt,
                      updatedAt: advertisement.companyInfo.updatedAt,
                      __v: advertisement.companyInfo.__v
                  },
                  expireDate: formatMongoDBDate(advertisement.expireDate),
                  isLicensed: advertisement.isLicensed,
                  image: advertisement.image
              };
          }),
          page: result.page,
          pageSize: result.pageSize,
          totalPages: result.totalPages,
          totalDocs: result.totalDocs
      });
  } catch (err) {
      console.error(err);
      return res.json([]);
  }
};
const changeAdsStatus = async (req, res, next) => {
  const id = req.params.id;
  const license = await advertisementService.changeAdsStatus(id);


  if (!license) {
      return res.status(404).json({ error: 'License not found' });
  }

  res.json({ message: 'License approved successfully', isApproved: true });

}
export {getAdsWithSetPoint,createAds,getAdsAll,getAdsFilter,deleteAdsById,changeAdsStatus}
