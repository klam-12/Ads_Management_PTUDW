import advertisementService from '../services/advertisement.service.js';
import companyService from '../services/company.service.js';
const getAdsWithSetPoint = async (req, res) => {
  const id_setpoint = req.query.id_setpoint;
  const list = await advertisementService.getAdsWithSetPoint(id_setpoint);
  return res.json(list)
}

const createAds = async(req,res,next) =>{
  const body = req.body;
  // console.log(body)
  const company = {
    name: body.name,
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
    image:body.img || null,
    companyId: newCompany._id,
    startDate: body.startDate || Date.now(),
  }
  console.log(ads)
  const result = await advertisementService.createAds(ads);
  console.log(result)
  return res.json(result)
}
export {getAdsWithSetPoint,createAds}