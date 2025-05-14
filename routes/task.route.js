import express from "express";
const router = express.Router();

import {
  getUserTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";

router.get("/:id/reminders", getUserTasks);
router.post("/:id/reminders", addTask);
router.put("/:id/reminders/:taskId", updateTask);
router.delete("/:id/reminders/:taskId", deleteTask);

export default router;
