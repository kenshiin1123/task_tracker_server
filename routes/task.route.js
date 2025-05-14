import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

router.use(authMiddleware);
router.get("/:id/tasks/", getTasks);
router.post("/:id/tasks/", addTask);
router.put("/:id/tasks/:taskId", updateTask);
router.delete("/:id/tasks/:taskId", deleteTask);

export default router;
