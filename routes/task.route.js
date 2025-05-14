import express from "express";
const router = express.Router();

import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

router.get("/:id/reminders", getTasks);
router.post("/:id/reminders", addTask);
router.put("/:id/reminders/:taskId", updateTask);
router.delete("/:id/reminders/:taskId", deleteTask);

export default router;
