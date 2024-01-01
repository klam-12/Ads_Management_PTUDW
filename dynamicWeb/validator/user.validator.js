import Joi from 'joi';
import { USER, WARDS, ROLE } from '../constants/index.js';
import User from '../models/User.js';
import { BadRequest } from '../common/error.response.js';

const validateInfoUser = Joi.object({
  //  username, fullName,birthDate, phoneNumber, password, role, dictrict, ward, email 
  username: Joi.string().min(USER.MIN_FULLNAME_LENGTH).max(USER.MAX_FULLNAME_LENGTH),
  fullName: Joi.string().min(USER.MIN_FULLNAME_LENGTH).max(USER.MAX_FULLNAME_LENGTH),
  birthDate: Joi.date().iso(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phoneNumber: Joi.string()
  .length(10)
  .pattern(/(\+84|0[3|5|7|8|9])+([0-9]{8})\b/),
  password: Joi.string().min(USER.MIN_PASSWORD_LENGTH).max(USER.MAX_PASSWORD_LENGTH),
  role: Joi.string().valid(...ROLE),
  district: Joi.string().valid('Quận 1', 'Quận 5'),
  ward: Joi.string().custom((value, helpers) => {
    const { district } = helpers.prefs.context;
    console.log(district);
    if (!WARDS[district].includes(value)) {
      return helpers.message('Phường không hợp lệ cho quận');
    }
    return value;
  }),
})

const validateRequiredCreate = Joi.object({
  username: Joi.string().required(),
  fullName: Joi.string().required(),
  birthDate: Joi.date().required(),
  email: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid(...ROLE).required(),
  district: Joi.string().allow(null).when('role', {
    is: 'Cán bộ Sở',
    then: Joi.string().allow(null),
    otherwise: Joi.string().required()
  }),
  ward: Joi.string().allow(null).when('role', {
    is: 'Cán bộ Phường',
    then: Joi.string().required(),
    otherwise: Joi.string().allow(null)
  })
})

const validateCreateAccount = (user) => {
  const { error: requiredError, value: requiredValue } = validateRequiredCreate.validate(user);
  
  if (requiredError) {
    throw new BadRequest(requiredError);
  }
  const { error: infoError, value: infoValue } = validateInfoUser.validate(requiredValue,{
    context: { district: requiredValue.district },
  });
  return { value: infoValue, error: infoError };
};

const validateUpdateAccount = Joi.object({
  fullName: Joi.string().min(USER.MIN_FULLNAME_LENGTH).max(USER.MAX_FULLNAME_LENGTH),
  birthDate: Joi.date().iso(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phoneNumber: Joi.string()
  .length(10)
  .pattern(/(\+84|0[3|5|7|8|9])+([0-9]{8})\b/),
})
export {validateCreateAccount,validateUpdateAccount}