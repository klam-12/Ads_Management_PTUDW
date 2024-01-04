import setpointService from "../services/setpoint.service.js";
import { SuccessResponse } from '../common/success.response.js';
import { NotFoundResponse } from '../common/error.response.js';

const getSetPoint = async (req, res, next) => {
  try {
    const listSetPoint = await setpointService.getAllSetPoint();
    // return new SuccessResponse({
    //   metadata: listSetPoint,
    // }).send(req,res); 
    return res.render('vwAdmin/vwDepartment/spaceList', {
      list: listSetPoint,
      // layout: false
    })
  } 
  catch (error) {
    throw new NotFoundResponse();
  }
};

export { getSetPoint };
