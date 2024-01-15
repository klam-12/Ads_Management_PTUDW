import {CreatedResponse, SuccessResponse, } from '../common/success.response.js';
import authService from '../services/auth.service.js';
import userService from '../services/user.service.js';
import { BadRequest,NotFoundResponse } from '../common/error.response.js';
import {validateUpdateAccount} from '../validator/user.validator.js';

const getMe = async (req, res, next) => {
  res.render('vwAccount/profile',{
    layout:false,
  });
}
const editProfile = async (req, res, next) => {
  const data = req.body;
  console.log(req.body)
  const id =  req.session.authUser._id
  const user = await userService.getUserById(id)
  const dateString = data.birthDate; // Chuỗi ngày tháng
const parts = dateString.split('/'); // Phân tách chuỗi ngày tháng
const day = parseInt(parts[0], 10); // Ngày
const month = parseInt(parts[1], 10) - 1; // Tháng (trừ 1 vì tháng bắt đầu từ 0)
const year = parseInt(parts[2], 10);
const dateObject = new Date(year, month, day);
  const profileInput = {
    fullName: data.fullName || user.fullName,
    email: data.email || user.email,
    phoneNumber: data.phoneNumber || user.phoneNumber,
    birthDate: dateObject || user.birthDate,
   }
  console.log(profileInput)
  const {value, error} = validateUpdateAccount.validate(profileInput);
  if (error) {
    return res.render('vwAccount/profile', {
      // layout: false,
      err_message: error.details[0].message
    })
  }
  const profile = await userService.updateUser(id, value);
  req.session.authUser = profile;
  console.log(profile)
  console.log(req.session.authUser)
  return res.render('vwAccount/profile', {
    layout: false,
    success_message: 'Cập nhật thành công'
  })
}
export {getMe,editProfile}