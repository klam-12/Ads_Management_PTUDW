import { ReasonPhrases, StatusCodes } from "../utils/httpStatus.js";
import pick from "../utils/pick.js";

class SuccessResponse {
  constructor({ message = ReasonPhrases.OK, code = StatusCodes.OK, metadata = {} }) {
    this.payload = {
      message,
      code,
      metadata
    }
  }

  send({ req, res, header = {}, cookies = {} }) {
    // Handle cookie
    Object.entries(cookies).forEach(([key, value]) => {
      if(value) {
        res.cookie(key, value)
      } else {
        res.clearCookie(key)
      }
    })
    // __logger.info(this.payload.message, { ...pick(req, ["ip", "originalUrl", "method", "params", "body"]), status: this.payload.code })
    return res.status(this.payload.code).json(this.payload);
  }
} 

class CreatedResponse extends SuccessResponse {
  constructor({ message = ReasonPhrases.CREATED, code = StatusCodes.CREATED, metadata = {} }) {
    super({ message, code, metadata })
  }
}


export { SuccessResponse, CreatedResponse };
