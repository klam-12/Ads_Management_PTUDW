import {CreatedResponse, SuccessResponse, } from '../common/success.response.js';
import authService from '../services/auth.service.js';
import userService from '../services/user.service.js';
import { BadRequest,NotFoundResponse } from '../common/error.response.js';
import {validateUpdateAccount} from '../validator/user.validator.js';

const getMe = async (req, res, next) => {
  const { id } = req.user;
  const user = await userService.getUserById(id);
    if (!user) {
        return next(new NotFoundResponse('User not found'));
    }
  const profile = {
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    birthDate: user.birthDate,
  }
  return new SuccessResponse({
    metadata: profile
  }).send(req,res);
}
const editProfile = async (req, res, next) => {
  const { id } = req.user;
  const data = req.body;
  const user = await userService.getUserById(id);
  if (!user) {
      return next(new NotFoundResponse('User not found'));
  }
  const profileInput = {
    fullName: data.fullName || user.fullName,
    email: data.email || user.email,
    phoneNumber: data.phoneNumber || user.phoneNumber,
    birthDate: data.birthDate || user.birthDate,
   }
  console.log(profileInput)
  const {value, error} = validateUpdateAccount.validate(profileInput);
  if (error) {
    throw new BadRequest(error);
  }

  const profile = await userService.updateUser(id, value);

  return new SuccessResponse({
    metadata: profile
}).send(req,res);
}
export {getMe,editProfile}