import setpointRoute from '../routes/setpoint.routes.js';
import authRoute from '../routes/auth.routes.js';
import userRoute from '../routes/user.routes.js';
import { authentication } from '../middlewares/authorization.js';
import asyncHandler from '../middlewares/asyncHandler.js';

function route(app) {
  app.get('/',asyncHandler(authentication), (req, res) => {
    res.render('home');
  });
  app.use("/setPoints", setpointRoute);
  app.use("/auth", authRoute);
  app.use("/users", userRoute);
}

export default route;
