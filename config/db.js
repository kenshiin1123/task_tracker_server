import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

const { connect, connection } = mongoose;

export default () => {
  connect(MONGODB_URL);
  connection.on("error", console.error.bind("Connection Error"));
  connection.once("open", () => {
    console.log("Mongodb Connected!");
  });
};
