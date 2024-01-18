import { BadRequest } from '../common/error.response.js';
import { SuccessResponse } from '../common/success.response.js';
import requestService from '../services/request.service.js';

const createRequest = async(req, res) => {
  const body = req.body;
  console.log(body)
  const user_id = req.session.authUser._id
  const {reason, objectToEdit, objectId} = body;
  if (reason===''){
    throw new BadRequest('Please enter a reason for requesting')
  }
  let data;
  if (objectToEdit === 'SetPoint'){
    
    const {adsFormat, typeofLocation, isPlanned, image} = body;
    // const image = null
     data = {
      user_id,
      objectToEdit,
      objectId,
      requestedAt: new Date(),
      reason,
      status: 'Pending',
      updatedInfo: {
       adsFormat,
       typeofLocation,
       isPlanned,
       image
      }
    }

  }
  else {
    const {width, height, quantity, typeofAds} = body;
     data = {
      user_id,
      objectToEdit,
      objectId,
      requestedAt: new Date(),
      reason,
      status: 'Pending',
      updatedInfo: {
        width,
        height,
        quantity,
        typeofAds
      }
    }
  }
  const newRequest = await requestService.createRequest(data);
  const response = {
    message: 'Request received successfully!',
    data: newRequest // This might include data processed from the form
  };

  // Send the response
  res.json(response);
}

const handleReport = async(req, res) => {
  const {id, handleContent} = req.body
  const report = await requestService.handleReport(id, handleContent);
} 
export {createRequest,handleReport}