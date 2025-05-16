import { GlucoseHistory } from "../../models/glucoseHistory.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export async function prepareDailyGraphDataResponse(dailyGraphBeforeMeal, dailyGraphAfterMeal) {
    const beforeMeal = [];
    const afterMeal = [];
    const x = [];
    /* 
        {
            x: ["Reading 1", "Reading 2", "Reading 3", ...],
            beforeMeal: [], 
            afterMeal:[]
        }

            1. Deal with missing entries
                i. after meal taken but before meal not taken
                ii. before meal but after meal not taken
                iii. deal with starting before meal and ending after meal missing case
                iv. both should be greater than zero
                v. fill the missing values as zero by comparing createdAt date time
        */
    let beforeIndex = 0;
    let afterIndex = 0;
    let xIndex = 0;
    if(dailyGraphBeforeMeal.length > 0 && dailyGraphAfterMeal.length>0){
        while (beforeIndex < dailyGraphBeforeMeal.length && afterIndex < dailyGraphAfterMeal.length) {
            // one or more after meal present before a before meal
            if(dailyGraphAfterMeal[afterIndex].createdAt === dailyGraphBeforeMeal[beforeIndex].createdAt){
                beforeIndex++;
                afterIndex++;
            }else if (dailyGraphAfterMeal[afterIndex].createdAt < dailyGraphBeforeMeal[beforeIndex].createdAt) {
                x.push(`Reading ${++xIndex}`);
                beforeMeal.push(0);
                afterMeal.push(dailyGraphAfterMeal[afterIndex].glucoseLevelReading);
                afterIndex++;
            } else if (dailyGraphAfterMeal[afterIndex].createdAt > dailyGraphBeforeMeal[beforeIndex].createdAt) {
                // more than one before meal are present before a after meal
                if (beforeIndex < dailyGraphBeforeMeal.length - 1) {
                    if (dailyGraphBeforeMeal[beforeIndex + 1].createdAt < dailyGraphAfterMeal[afterIndex].createdAt) {
                        beforeMeal.push(dailyGraphBeforeMeal[beforeIndex++].glucoseLevelReading);
                        afterMeal.push(0);
                        x.push(`Reading ${++xIndex}`);
                    }
                }
            } else {
                // before meal and after meal pair are present
                beforeMeal.push(dailyGraphBeforeMeal[beforeIndex++].glucoseLevelReading)
                afterMeal.push(dailyGraphAfterMeal[afterIndex++].glucoseLevelReading)
                x.push(`Reading ${++xIndex}`);
            }
        }
    }

    // all after meal are over but before meal are present
    while (beforeIndex < dailyGraphBeforeMeal.length) {
        x.push(`Reading ${++xIndex}`);
        afterMeal.push(0);
        beforeMeal.push(dailyGraphBeforeMeal[beforeIndex++].glucoseLevelReading);
    }
    // all before meal are over but after meal are present
    while (afterIndex < dailyGraphAfterMeal.length) {
        x.push(`Reading ${++xIndex}`);
        beforeMeal.push(0);
        afterMeal.push(dailyGraphAfterMeal[afterIndex++].glucoseLevelReading);
    }

    return {x, beforeMeal, afterMeal};
}

export const fetchLatestDailyGraph = asyncHandler(async (_, res) => {
    try {
        const startOfDay = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
        const startOfTomorrow = new Date(new Date().setHours(24, 0, 0, 0));
        const latestDailyGraphBeforeMeal = await GlucoseHistory.find({
            createdAt: { $lte: startOfTomorrow, $gt: startOfDay },
            readingTaken: "Before Meal"
        });
        const latestDailyGraphAfterMeal = await GlucoseHistory.find({
            createdAt: { $lte: startOfTomorrow, $gt: startOfDay },
            readingTaken: "After Meal"
        });


        const dailyGraphData = await prepareDailyGraphDataResponse(latestDailyGraphBeforeMeal, latestDailyGraphAfterMeal);


        return res.json(new ApiResponse(200, dailyGraphData, "Successfully fetched latest day"));

    } catch (e) {
        return res.json(new ApiError(400, "Error at fetchLatestDailyGraph", e));
    }
})

export const fetchCustomDailyGraph = asyncHandler(async (req, res) => {
    const { date } = req.params;

    try {
        const startOfDay = new Date(new Date(date).setHours(0, 0, 0, 0)).toISOString();
        const startOfTomorrow = new Date(new Date(date).setHours(24, 0, 0, 0));
        const dailyGraphBeforeMeal = await GlucoseHistory.find({
            createdAt: { $lte: startOfTomorrow, $gt: startOfDay },
            readingTaken: "Before Meal"
        }).sort({createdAt: "asc"});
        const dailyGraphAfterMeal = await GlucoseHistory.find({
            createdAt: { $lte: startOfTomorrow, $gt: startOfDay },
            readingTaken: "After Meal"
        }).sort({createdAt: "asc"});

        const dailyGraphData = await prepareDailyGraphDataResponse(dailyGraphBeforeMeal, dailyGraphAfterMeal);

        return res.json(new ApiResponse(200, dailyGraphData, `Successfully fetched ${date} data`));
    } catch (error) {
        return res.json(new ApiError(500, "Error at fetchCustomDailyGraph", error));
    }
})
