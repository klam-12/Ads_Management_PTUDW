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
  async acceptRequest(id){
    const request = await EditRequest.findOneAndUpdate({ _id: id }, { status: 'Approved' }, { new: true });
    return request;
  }
}

export default new Request();