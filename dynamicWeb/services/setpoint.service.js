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
  async getSetPointWithlatlng(lat, lng) {
    try {
      const data = await SetPointModel.findOne({ lat, lng });
      return data;
    } catch (error) {
      throw new Error("Failed to fetch setpoints");
    }
  }
  async createSetpoint(setpoint) {
    try {
      const data = await SetPointModel.create(setpoint);
      console.log('hihi')
      return data;
    } catch (error) {
      // throw new Error("Failed to create setpoint");
    }
  }
}
export default new SetPoint;
