import mongoose, {Mongoose, Schema} from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index:true,
            null:false,
        },
        age: {
            type: Schema.Types.Int32,
            required: true,
            max: 150,
            min: 0,
        },
        weight: {
          type: Number,
          required: true,
        },
        height: {
          type: Number,
          required: true,
        },
        activity: {
            type: String,
            enum: ["low", "moderate", "high"],
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema)