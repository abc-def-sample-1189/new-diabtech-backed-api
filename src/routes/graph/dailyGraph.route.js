import { Router } from "express";
import { fetchCustomDailyGraph, fetchLatestDailyGraph } from "../../controllers/graph/dailyGraph.controller.js";


const dailyGraphRoute = Router();

dailyGraphRoute.get("/latest", fetchLatestDailyGraph)
dailyGraphRoute.get("/:date", fetchCustomDailyGraph)


export default dailyGraphRoute;
