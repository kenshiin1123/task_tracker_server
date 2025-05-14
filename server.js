import express from "express";
import dotenv from "dotenv";
import AppError from "./util/AppError.js";
dotenv.config();

// Global Variables / Environmental Variables
const PORT = process.env.PORT || 5000;
const app = express();

// Utility Functions

// Middlewares
app.use(express.json());

// Routes

app.get("/", (req, res) => {
  res.send(
    "<center style='margin-top:5rem;'> <h1>Task Tracker Server 🖥️</h1> </center>"
  );
});

// Error Handler
app.use((err, req, res, next) => {
  const { status, message } = err;
  res.status(status).json({ message });
});

// Server Starter
app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
