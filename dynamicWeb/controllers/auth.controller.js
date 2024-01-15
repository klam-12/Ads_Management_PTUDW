import authService from '../services/auth.service.js';
import { SuccessResponse,CreatedResponse } from '../common/success.response.js';
import userService from '../services/user.service.js';
import {validateCreateAccount} from '../validator/user.validator.js';
import { BadRequest,ConflictResponse } from '../common/error.response.js';
import bcrypt from 'bcryptjs';
import {sendEmail} from '../utils/sendEmail.js'
import {generateOTP} from '../utils/otp.js'
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
    let userInput = { username, fullName,birthDate, phoneNumber, password, role, district, ward, email };

    const { value, error } = validateCreateAccount(userInput);
    if (error) {
        throw new BadRequest(error);
    }
    const existedUser = await userService.getOneUser({ username: userInput.username });
    if (existedUser) {
        throw new ConflictResponse('User already exists');
    }
    // console.log(userInput)
    const hashedPassword = await bcrypt.hash(value.password, 10);
    console.log(hashedPassword)
    value.password = hashedPassword;
    await userService.createUser(value);
    const response = new CreatedResponse({ message: 'User created successfully', metadata: value });
    return response.send(req, res);
}
const logout = async (req, res, next) => {
  req.session.auth = false;
  req.session.authUser = undefined;
  res.redirect('/auth/signIn');
}


const resetPasswordAuth = async (req, res, next) =>  {
  const oldPassword = req.body.oldPass;
    const newPassword = req.body.newPass;
    const newPasswordConfirm = req.body.newPassConfirm;

  const user = req.session.authUser
  const isMatch = await bcrypt.compareSync(oldPassword, user.password);
  if (!isMatch) {
    return res.render('vwAccount/setPass', {
      layout: false,
      msg: 'Invalid password.'
    });
  }
  if (newPassword !== newPasswordConfirm) {
    return res.render('vwAccount/setPass', {
      layout: false,
      msg: 'Confirm password does not match.'
    });
  }
  if (newPassword.length < 8 || newPassword.length > 30) {
    return res.render('vwAccount/setPass', {
      layout: false,
      msg: 'Password must be between 8 and 30 characters.'
    });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await userService.updateUser(user._id, user);
  logout(req, res, next)
}

const sendOTP = async (req, res, next) => {
  const email = req.body.email
  if (!email) {
    return res.render('vwAccount/forgotPass', {
      layout: false,
      err_message: 'Email not found.'
    });
  }
  const user = await userService.getOneUser({ email: email });
  if (!user) {
    return res.render('vwAccount/forgotPass', {
      layout: false,
      err_message: 'Email not found.'
    });
  }
  const otp = generateOTP();
  console.log(otp)
  const subject = "Change Password OTP";
  const text = `Your OTP for changing the password is: ${otp}`;
  // const link = `http://localhost:${port}/verify-otp?email=${userEmail}&otp=${otp}`;
  // sendEmail(email, subject, text)
  // // return res.render('vwAccount/inputOTP', {
  // //   layout: false,
  // //   email: email
  // // })
  // return res.redirect('/auth/inputOTP')
  // const link = `http://localhost:3000/verify-otp?email=${email}&otp=${otp}`;

  sendEmail(email, subject, text);
  res.send(`Một email xác nhận đã được gửi đến địa chỉ ${email}. Nhấp vào liên kết để xác nhận: ${link}`);
}

// const send = async (req, res, next) =>{
//   const userEmail = req.body.email;

//   // Tạo và lưu OTP vào cơ sở dữ liệu
//   const otp = generateOTP();
//   users[userEmail] = { otp };

//   // Gửi email chứa OTP và liên kết xác thực
//   const subject = 'Xác nhận đổi mật khẩu';
//   const text = `Mã xác nhận của bạn là: ${otp}`;
//   const link = `http://localhost:${port}/verify-otp?email=${userEmail}&otp=${otp}`;

//   sendEmail(userEmail, subject, text);
//   res.send(`Một email xác nhận đã được gửi đến địa chỉ ${userEmail}. Nhấp vào liên kết để xác nhận: ${link}`);
// }

const changePassword = async (req, res, next) => {
  const email = req.body.email
  if (!email) {
    return res.render('vwAccount/forgotPass', {
      layout: false,
      err_message: 'Email not found.'
    });
  }
  const user = await userService.getOneUser({ email: email });
  if (!user) {
    return res.render('vwAccount/forgotPass', {
      layout: false,
      err_message: 'Email not found.'
    });
  }

  const newPass = Math.random().toString(36).slice(-8);

}

export { signIn,createAccount,logout,resetPasswordAuth,changePassword,sendOTP }