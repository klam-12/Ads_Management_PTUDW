import userModel from '../models/User.js';

class User{

  async getOneUser({ username }) {
    const user = await userModel.findOne({ username });
    return user;
  }


  async createUser(userInput) {
    const user = await userModel.create(userInput);
    return user; 
  }
  async getUserById(id){
    const user = await userModel.findById(id);
    return user;
  }
  async updateUser(id, data){
    const user = await userModel.findByIdAndUpdate(id, data, {new: true});
    return user;
  }
}

export default new User;