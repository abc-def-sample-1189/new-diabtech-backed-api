import { GlucoseHistory } from "../models/glucoseHistory.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const fetchReadingTakenRemaining = asyncHandler(async (_, res) => {
    try {
        const readingTakenRemaining = await GlucoseHistory.find({
            readingTaken: ""
        }, { updatedAt: 0 }).sort({ createdAt: "desc" });
        return res.json(new ApiResponse(200, readingTakenRemaining, "fetched all reading taken field remaining documents!"));
    } catch (error) {
        return res.json(new ApiError(500, "Error at fetchReadingTakenRemaining", error));
    }
})

export const fetchLatestReadingTakenToUpdate = asyncHandler(async (_, res) => {
    try {
        const readingTakenRemaining = await GlucoseHistory.find({
            readingTaken: ""
        }, { updatedAt: 0 }).sort({ createdAt: "desc" });
        return res.json(new ApiResponse(200, readingTakenRemaining[0], "fetched all reading taken field remaining document!"));
    } catch (error) {
        return res.json(new ApiError(500, "Error at fetchLatestReadingTakenToUpdate", error));
    }
})

export const updateReadingTaken = asyncHandler(async (req, res) => {
    try {
        const {_id, readingTaken} = req.body;
        const glucoseDocument = await GlucoseHistory.findOne({_id});
        glucoseDocument.readingTaken = readingTaken;
        glucoseDocument.save();
        const updatedDoc = await GlucoseHistory.findOne({_id});
        return res.json(new ApiResponse(200, updatedDoc, "Successfully updated the reading taken"));
    } catch (error) {
        return res.json(new ApiError(500, "Error at updateReadingTaken", error));
    }
})