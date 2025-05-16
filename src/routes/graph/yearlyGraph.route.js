import { Router } from "express";


const yearlyGraphRoute = Router();

yearlyGraphRoute.get("/latest", (req, res) => {})
yearlyGraphRoute.get("/:date", (req, res) => {}) // graph of 12 months average

export default yearlyGraphRoute;
