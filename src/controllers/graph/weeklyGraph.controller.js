import { GlucoseHistory } from "../../models/glucoseHistory.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export function getCurrentWeekDates(dateOfTheWeek = new Date()) {
  const today = dateOfTheWeek;
  const currentDay = today.getDay(); // Get the current day (0 - Sunday, 6 - Saturday)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - currentDay); // Adjust to Sunday of the current week

  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(sunday);
    day.setDate(sunday.getDate() + i); // Add i days to Sunday
    weekDates.push(day.toISOString().split('T')[0]); // Format as YYYY-MM-DD
  }

  return weekDates;
}

export async function prepareWeeklyGraphDataResponse(date = null){
    const requiredDate = date || new Date();
    const weekDates = getCurrentWeekDates(requiredDate);
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const x = weekDates.map((day, i) => {
      return `${weekDays[i]} ${day}`;
    });
    const beforeMeal = [];
    const afterMeal = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(new Date(weekDates[i]).setHours(0,0,0,0)).toISOString();
      console.log(currentDate);
      const today = new Date(new Date().setHours(24, 0,0,0)).toISOString();
      console.log(today);
      if (new Date(currentDate) <= new Date(today)) {
        const startOfDay = new Date(new Date(currentDate).setHours(0, 0, 0, 0)).toISOString();
        console.log(startOfDay)
        const startOfTomorrow = new Date(new Date(currentDate).setHours(24, 0, 0, 0));
        console.log(startOfTomorrow)
        const dailyGraphBeforeMeal = await GlucoseHistory.find({
          createdAt: { $lte: startOfTomorrow, $gt: startOfDay },
          readingTaken: "Before Meal"
        });
        console.log(dailyGraphBeforeMeal)
        if (dailyGraphBeforeMeal.length === 0) {
          beforeMeal.push(0);
        } else {
          let avgBeforeMeal = (dailyGraphBeforeMeal.map(item => item.glucoseLevelReading).reduce((acc, item) => acc + Number(item.trim()), 0)) / dailyGraphBeforeMeal.length;
          beforeMeal.push(avgBeforeMeal);
        }
        const dailyGraphAfterMeal = await GlucoseHistory.find({
          createdAt: { $lte: startOfTomorrow, $gt: startOfDay },
          readingTaken: "After Meal"
        });
        console.log(dailyGraphAfterMeal)
        if (dailyGraphAfterMeal.length === 0) {
          afterMeal.push(0)
        } else {
          const avgAfterMeal = (dailyGraphAfterMeal.map(item => item.glucoseLevelReading).reduce((acc, item) => acc + Number(item.trim()), 0)) / dailyGraphAfterMeal.length;

          afterMeal.push(avgAfterMeal);
        }
      } else {
        afterMeal.push(0);
        beforeMeal.push(0);
      }
    }

    return {x, beforeMeal, afterMeal};
}

export const fetchLatestWeeklyGraph = asyncHandler(async (_, res) => {
  try {
    const {x, beforeMeal, afterMeal} = await prepareWeeklyGraphDataResponse(new Date());
    return res.json(new ApiResponse(200, { x, beforeMeal, afterMeal }, "Successfully fetch latest week graph data"))
  } catch (e) {
    console.log(e)
    return res.json(new ApiError(500, "error at fetch latest weekly graph", e));
  }
})

export const fetchCustomWeeklyGraph = asyncHandler(async (req, res) => {
  const {date} = req.params;
  try {
    const {x, beforeMeal, afterMeal} = await prepareWeeklyGraphDataResponse(new Date(date));
    return res.json(new ApiResponse(200, { x, beforeMeal, afterMeal }, "Successfully fetch custom week graph data"))
  } catch (e) {
    console.log(e)
    return res.json(new ApiError(500, "error at fetch custom weekly graph", e));
  }
})