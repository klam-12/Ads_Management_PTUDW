import setpointService from "../services/setpoint.service.js";
import { SuccessResponse } from '../common/success.response.js';
import { NotFoundResponse } from '../common/error.response.js';
import {toAddress} from '../utils/map.js'
const getSetPoint = async (req, res, next) => {
  try {
    const listSetPoint = await setpointService.getAllSetPoint();
    const list = await Promise.all(listSetPoint.map(async (item) => {
      const address = await toAddress(item.lat, item.lng);
      console.log(address)
      return {
        _id: item._id,
        address,
        typeofLocation: item.typeofLocation,
        adsFormat: item.adsFormat,
        isPlanned: item.isPlanned,
        image: item.image,
      };
    }));
    
    return res.render('vwAdmin/vwDepartment/spaceList', {
      list,
    });
  } 
  catch (error) {
    throw new NotFoundResponse();
  }
};

export { getSetPoint };
