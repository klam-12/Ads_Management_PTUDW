import EditRequest from '../models/Request.js';

class Request{
  async createRequest(request){
    const newRequest = await EditRequest.create(request);
    return newRequest;
  }
}

export default new Request();