import mongoose, {Schema} from "mongoose";

const glucoseHistorySchema = new Schema(
    {
        glucoseLevelReading: {
            type: String,
            required: true,
        },
        readingTaken: {
            type: String,
            enum: ["Before Meal", "After Meal"], 
        },
    },
    {
        timestamps: true
    }
)

export const GlucoseHistory = mongoose.model("glucose_histories", glucoseHistorySchema)