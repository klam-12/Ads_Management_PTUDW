import userModel from '../models/User.js';
import userService from './user.service.js';
import { NotFoundResponse, AuthFailureResponse } from '../common/error.response.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
class User {
  async signIn(username, password) {
    const user = await userService.getOneUser({ username });
    if (!user) {
        throw new NotFoundResponse('Username or password is wrong');
    }

    // check password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        throw new AuthFailureResponse('Username or password is wrong');
    }

    // generate token
    const token = jwt.sign({ id: user._id, role: user.role }, 'secret', {
        expiresIn: '1h',
    });
    console.log({ token, user })
    return { token, user };
  }
}

export default new User();
