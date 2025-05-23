import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import taskRoute from "./routes/task.route.js";

dotenv.config();
// Global Variables / Environmental Variables
const PORT = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send(
    "<center style='margin-top:5rem;'> <h1>Task Tracker Server 🖥️</h1> </center>"
  );
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/users", taskRoute);

// Error Handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    success: false,
    message,
  });
});

// Server Starter
app.listen(PORT, "0.0.0.0", () => {
  console.log("Listening to port", PORT);
  connectDB();
});
