import { Router } from "express";
import graphRoutes from "./graph/index.route.js";
import userRoute from "./user/user.route.js";
import glucoseRoute from "./glucose/glucose.route.js";


const routes = Router();

routes.use('/graph', graphRoutes);
routes.use("/user", userRoute);
routes.use('/glucose', glucoseRoute);

export default routes;