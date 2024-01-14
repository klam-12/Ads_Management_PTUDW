import SetPointModel from '../models/SetPoint.js';

 class SetPoint {
  async getAllSetPoint() {
    try {
      const data = await SetPointModel.find({});
      return data;
    } catch (error) {
      throw new Error("Failed to fetch setpoints");
    }
  }
  async findById(id) {
    try {
      const data = await SetPointModel.findById(id);
      return data;
    } catch (error) {
      throw new Error("Failed to fetch setpoints");
    }
  }
}
export default new SetPoint;
