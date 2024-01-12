import setpointRoute from '../routes/setpoint.routes.js';
import authRoute from '../routes/auth.routes.js';
import userRoute from '../routes/user.routes.js';
import adsRouter from '../routes/advertisement.routes.js';
import requestRoute from '../routes/request.routes.js';
import reportRouter from '../routes/report.routes.js'
import { authentication,checkRoles } from '../middlewares/authorization.js';
import asyncHandler from '../middlewares/asyncHandler.js';
function route(app) {
  app.get('/',asyncHandler(authentication), (req, res) => {res.render('vwMap/map', {});});
  app.use("/setPoints", setpointRoute);
  app.use("/auth", authRoute);
  app.use("/users", userRoute);
  app.use("/ads", adsRouter)
  app.use("/request", requestRoute);
  app.use('/reports', reportRouter);
}

export default route;
