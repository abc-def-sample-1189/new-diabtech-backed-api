import { Router } from "express";
import { fetchCustomWeeklyGraph, fetchLatestWeeklyGraph } from "../../controllers/graph/weeklyGraph.controller.js";


const weeklyGraphRoute = Router();

weeklyGraphRoute.get("/latest", fetchLatestWeeklyGraph)
weeklyGraphRoute.get("/:date", fetchCustomWeeklyGraph) 

export default weeklyGraphRoute;
