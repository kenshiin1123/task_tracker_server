import express from "express";
const router = express.Router();

import { getUser } from "../controllers/user.controller";

router.get("/:id", getUser);
router.get("/:id/reminders");

export default router;
