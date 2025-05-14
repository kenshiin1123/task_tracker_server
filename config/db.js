import mongoose from "mongoose";

const { connect, connection } = mongoose;

export default () => {
  connect("mongodb://localhost:27017/task_tracker_db");
  connection.on("error", console.error.bind("Connection Error"));
  connection.once("open", () => {
    console.log("Mongodb Connected!");
  });
};
