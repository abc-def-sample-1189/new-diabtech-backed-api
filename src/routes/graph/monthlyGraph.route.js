import { Router } from "express";


const monthlyGraphRoute = Router();

monthlyGraphRoute.get("/latest", (req, res) => {})
monthlyGraphRoute.get("/:date", (req, res) => {}) // graph of 4 weeks average

export default monthlyGraphRoute;
