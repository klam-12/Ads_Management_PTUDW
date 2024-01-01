import authService from '../services/auth.service.js';
import { SuccessResponse,CreatedResponse } from '../common/success.response.js';
import userService from '../services/user.service.js';
import {validateCreateAccount} from '../validator/user.validator.js';
import { BadRequest,ConflictResponse } from '../common/error.response.js';
import bcrypt from 'bcryptjs';
const signIn = async (req, res, next) => {
  const {username, password} = req.body;
  const {token,user} = await authService.signIn(username, password);
  return new SuccessResponse({
         metadata: {token,user}
}).send(req,res)
}

const createAccount = async (req, res, next) => {
  const { username, fullName,birthDate, phoneNumber, password, role, district, ward, email } = req.body;
    const userInput = { username, fullName,birthDate, phoneNumber, password, role, district, ward, email };
    const { value, error } = validateCreateAccount(userInput);
    console.log(123,value);
    if (error) {
        throw new BadRequest(error);
    }
    const existedUser = await userService.getOneUser({ username: userInput.username });
    if (existedUser) {
        throw new ConflictResponse('User already exists');
    }
    const hashedPassword = await bcrypt.hash(value.password, 10);
    console.log(hashedPassword)
    value.password = hashedPassword;
    await userService.createUser(value);
    const response = new CreatedResponse({  metadata: value });
    return response.send(req, res);
}
export { signIn,createAccount }