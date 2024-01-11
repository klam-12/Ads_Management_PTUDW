import AdvertisementModel from "../models/Advertisement.js";

class Advertisement{
  async getAdsWithSetPoint(id_setPoint){
    const list = await AdvertisementModel.find({id_setpoint: id_setPoint});
    return list;
  }
  async createAds(ads){
    console.log(ads)
    const newAds = await AdvertisementModel.create(ads);
    return newAds;
  }
}

export default new Advertisement();