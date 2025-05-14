import { model, Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["complete", "pending"],
    },
    category: {
      type: String,
      required: true,
      enum: ["work", "personal", "school"],
    },
    dueDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Task", taskSchema);
