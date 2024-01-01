import setpointRoute from '../routes/setpoint.routes.js';
import authRoute from '../routes/auth.routes.js';
import userRoute from '../routes/user.routes.js';

function route(app) {
  app.use("/setPoints", setpointRoute);
  app.use("/auth", authRoute);
  app.use("/users", userRoute);
}

export default route;
