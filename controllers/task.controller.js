import AppError from "../util/AppError.js";
import wrapAsync from "../util/wrapAsync.js";

import User from "../models/user.model.js";
import Task from "../models/task.model.js";

const getTasks = wrapAsync(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw new AppError("ID is required", 400);
  }

  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found!", 404);
  }

  const tasks = await Promise.all(
    user.tasks.map(async (taskId) => {
      return await Task.findById(taskId);
    })
  );

  return res.status(200).json({
    message: "Successfully retrieved tasks",
    success: true,
    data: tasks,
  });
});

const addTask = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { title, description, status, category, dueDate } = req.body;
  if (!title || !status || !category) {
    throw new AppError(
      "Please input these required fields: title, status, category",
      400
    );
  }

  if (!id) {
    throw new AppError("User ID is required!", 400);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new AppError("Cannot find user!", 404);
  }

  const newTask = new Task({ title, description, status, category, dueDate });

  //   Push the new task id to the user's task array.
  user.tasks.push(newTask._id);

  //   Save the new task in the tasks collection
  await newTask.save();

  //   Save the user to update user's tasks array.
  await user.save();

  res
    .status(200)
    .json({ message: "Successfully added new task!", success: true });
});

const updateTask = wrapAsync(async (req, res) => {
  const { id, taskId } = req.params;
  const { task } = req.body;
  const { title, description, status, category, dueDate } = task;

  if (!title || !status || !category || !taskId) {
    throw new AppError(
      "Please fill these required fields: title, status, category, and task ID",
      400
    );
  }

  if (!id) {
    throw new AppError("User ID is required!", 400);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new AppError("Cannot find user!", 404);
  }

  const taskExists = user.tasks.find((t) => t.toString() === taskId);
  if (!taskExists) {
    throw new AppError("Cannot find the task in user's tasks array.", 404);
  }

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { title, description, status, category, dueDate },
    { new: true }
  );

  return res.status(200).json({
    message: "Successfully updated the task!",
    success: true,
    task: updatedTask,
  });
});

const deleteTask = wrapAsync(async (req, res) => {
  const { id, taskId } = req.params;

  if (!id || !taskId) {
    throw new AppError("User ID and task ID is required", 400);
  }

  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found!", 404);
  }

  // Remove task from user's tasks array
  const updatedUserTasks = user.tasks.filter(
    (task) => task._id.toString() !== taskId
  );

  user.tasks = updatedUserTasks;
  await user.save();

  // Also remove task from Task collection
  await Task.findByIdAndDelete(taskId);

  return res
    .status(200)
    .json({ message: "Successfully removed task", success: true });
});

export { getTasks, addTask, updateTask, deleteTask };
