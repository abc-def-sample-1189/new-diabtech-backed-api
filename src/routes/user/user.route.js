import { Router } from "express";
import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

const userRoute = Router();

userRoute.get("/", async (req, res) => {
  try {
    const user = await User.findOne({});
    return res.json(new ApiResponse(200, user, "user fetched successfully"));
  } catch (error) {
    return res.json(new ApiError(500, "getting user failed"));
  }
})

userRoute.post("/", async (req, res) => {
  try {
    const {username, age, weight, height, activity} = req.body;
    const user = await User.findOneAndUpdate({username}, {age, weight,height,activity});
    user.save();
    const updatedUser = await User.findOne({username});
    return res.json(new ApiResponse(200, updatedUser, "user fetched successfully"));
  } catch (error) {
    return res.json(new ApiError(500, "updating user failed"));
  }
})

export default userRoute;