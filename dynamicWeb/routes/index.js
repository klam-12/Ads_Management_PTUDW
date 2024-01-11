import setpointRoute from '../routes/setpoint.routes.js';
import authRoute from '../routes/auth.routes.js';
import userRoute from '../routes/user.routes.js';
import { authentication } from '../middlewares/authorization.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import adsRouter from '../routes/advertisement.routes.js';
import requestRoute from '../routes/request.routes.js';
function route(app) {
  app.get('/',asyncHandler(authentication), (req, res) => {res.render('vwMap/map', {});});
  app.use("/setPoints", setpointRoute);
  app.use("/auth", authRoute);
  app.use("/users", userRoute);
  app.use("/ads", adsRouter)
  app.use("/request", requestRoute)
}

export default route;
