import EditRequest from '../models/Request.js';

class Request{
  async createRequest(request){
    const newRequest = await EditRequest.create(request);
    return newRequest;
  }
  async getRequestByObjectId(objectId){
    const request = await EditRequest.findOne({objectId});
    return request;
  }
}

export default new Request();