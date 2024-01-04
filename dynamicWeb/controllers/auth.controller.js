import authService from '../services/auth.service.js';
import { SuccessResponse,CreatedResponse } from '../common/success.response.js';
import userService from '../services/user.service.js';
import {validateCreateAccount} from '../validator/user.validator.js';
import { BadRequest,ConflictResponse } from '../common/error.response.js';
import bcrypt from 'bcryptjs';
const signIn = async (req, res, next) => {
  const {username, password} = req.body;
  const user = await authService.signIn(username, password);
  if (user === null) {
    return res.render('vwAccount/signIn', {
      layout: false,
      err_message: 'Invalid username or password.'
    });
  }
  delete user.password;
  req.session.auth = true;
  req.session.authUser = user;
  
  const url = req.session.retUrl || '/';
  res.redirect(url);

}

const createAccount = async (req, res, next) => {
  const { username, fullName,birthDate, phoneNumber, password, role, district, ward, email } = req.body;
    const userInput = { username, fullName,birthDate, phoneNumber, password, role, district, ward, email };
    const { value, error } = validateCreateAccount(userInput);
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
const logout = async (req, res, next) => {
  req.session.auth = false;
  req.session.authUser = undefined;
  res.redirect('/auth/signIn');
}
export { signIn,createAccount,logout }