import AdvertisementModel from "../models/Advertisement.js";

class Advertisement{
  async getAdsWithSetPoint(id_setPoint){
    const list = await AdvertisementModel.find({id_setpoint: id_setPoint, isLicensed: true});
    return list;
  }
  async createAds(ads){
    console.log(ads)
    const newAds = await AdvertisementModel.create(ads);
    return newAds;
  }

  async getAlAds(){
    const list = await AdvertisementModel.find({});
    return list;
  }
  async deleteAdsById(id){
    const result = await AdvertisementModel.deleteOne({_id: id});
    return result
  }
  async changeAdsStatus(id){
    const result = await AdvertisementModel.updateOne({_id: id}, {$set: {isLicensed: true}});
    return result
  }
  async deleteAdsBySetPointId(id){
    const result = await AdvertisementModel.deleteMany({id_setpoint: id});
    return result
  }
}

export default new Advertisement();