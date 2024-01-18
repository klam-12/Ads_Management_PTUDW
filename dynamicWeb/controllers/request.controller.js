import { BadRequest } from '../common/error.response.js';
import { SuccessResponse } from '../common/success.response.js';
import requestService from '../services/request.service.js';
import userService from '../services/user.service.js';
import setPointService from '../services/setpoint.service.js';
import adsService from '../services/advertisement.service.js';
import { sendEmail } from '../utils/sendEmail.js';
import Upload from '../utils/upload.js';
const createRequest = async(req, res) => {
  const body = req.body;
  const user_id = req.session.authUser._id
  const {reason, objectToEdit, objectId} = body;
  if (reason===''){
    throw new BadRequest('Please enter a reason for requesting')
  }
  let data;
  if (objectToEdit === 'SetPoint'){
    
    const {adsFormat, typeofLocation, isPlanned, image} = body;
    if(image){
      const uploadedResponse = await Upload.uploadFile(req.file.path).catch((error) => {});
      image = uploadedResponse.secure_url;
    }
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
const getRequestById = async(req, res) => {
  console.log(req)
  const id = req.query.id_setpoint
  const request = await requestService.getRequestByObjectId(id)
  if (!request) {
    return res.json({message: 'Request not found'})
  }
  const user = await userService.getUserById(request.user_id)
  let name = 'Cán bộ ';
  if (user.role == 'Cán bộ Phường'){
    name = user.ward;
  }
  else name = user.district
  return res.json({request, name})
}

const acceptRequest = async(req, res) => {
  const id = req.params.id
  const request = await requestService.acceptRequest(id)
  if (request.type === 'SetPoint'){
    const data = {
      adsFormat: request.updatedInfo.adsFormat,
      typeofLocation: request.updatedInfo.typeofLocation,
      isPlanned: request.updatedInfo.isPlanned,
    }
    await setPointService.updateSetPoint(request.objectId, data)
  }
  else {
    const data = {
      width: request.updatedInfo.width,
      height: request.updatedInfo.height,
      quantity: request.updatedInfo.quantity,
      typeofAds: request.updatedInfo.typeofAds,
      expireDate: request.updatedInfo.expireDate
    }
    await adsService.updateAds(request.objectId, data)
  }
  const user = await userService.getUserById(request.user_id)
  const subject = '[Ads Management System)_G5]'
  const text = ` <p>Chào ${user.fullName},</p>

  <p>Cán bộ Sở đã duyệt yêu cầu chỉnh sửa của bạn được gửi ở địa chỉ {address}. Vui lòng xem lại thông tin mới ở trang chủ.</p>

  <p>Trân trọng,</p>
  <p>Ads Management System_G5</p>`
  try{
    await sendEmail(user.email, subject, text)
    return new SuccessResponse('Request accepted successfully!')
  } catch
  (err) {
    return res.json(err)
  }


  
}


export {createRequest,handleReport, getRequestById,acceptRequest}