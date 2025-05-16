import { Router } from "express";
import dailyGraphRoute from "./dailyGraph.route.js";
import weeklyGraphRoute from "./weeklyGraph.route.js";
import monthlyGraphRoute from "./monthlyGraph.route.js";
import yearlyGraphRoute from "./yearlyGraph.route.js";


const graphRoutes = Router();

graphRoutes.use('/daily', dailyGraphRoute)
graphRoutes.use('/weekly', weeklyGraphRoute)
graphRoutes.use('/monthly', monthlyGraphRoute)
graphRoutes.use('/yearly', yearlyGraphRoute)

export default graphRoutes;