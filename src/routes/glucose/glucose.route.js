import { Router } from "express";
import { fetchLatestReadingTakenToUpdate, fetchReadingTakenRemaining, updateReadingTaken } from "../../controllers/glucose.controller.js";

const glucoseRoute = Router();

glucoseRoute.get("/latest", fetchLatestReadingTakenToUpdate)
glucoseRoute.get("/readingTakenRemaining", fetchReadingTakenRemaining)
glucoseRoute.post("/update", updateReadingTaken)

export default glucoseRoute;