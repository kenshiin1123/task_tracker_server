import AppError from "../util/AppError.js";
import wrapAsync from "../util/wrapAsync.js";
import User from "../models/user.model.js";
import Task from "../models/task.model.js";

const getUser = wrapAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError("ID is required", 400);
  }

  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found!", 404);
  }

  res.status(200).json({
    message: "Successfully retrieved user",
    success: true,
    data: user,
  });
});

export { getUser };
