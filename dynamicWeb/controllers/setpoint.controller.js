import SetPointService from "../services/setpoint.service.js";
import { SuccessResponse } from '../common/success.response.js';
import { NotFoundResponse } from '../common/error.response.js';

const getSetPoint = async (req, res, next) => {
  try {
    const setpointService = new SetPointService();
    const listSetPoint = await setpointService.getAllSetPoint();
    return new SuccessResponse({
      metadata: listSetPoint,
    }).send(req,res); 
  } 
  catch (error) {
    throw new NotFoundResponse();
  }
};

export { getSetPoint };
