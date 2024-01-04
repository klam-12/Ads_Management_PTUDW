import userModel from '../models/User.js';
import userService from './user.service.js';
import { NotFoundResponse, AuthFailureResponse } from '../common/error.response.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
class User {
  async signIn(username, password) {
    const user = await userService.getOneUser({ username });
    if (!user) {
        return null;
    }

    // check password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return null;
    }

    console.log({ user })
    return user;
  }
}

export default new User();
