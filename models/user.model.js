import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    lowercase: true,
  },
  passwordHash: {
    required: true,
    type: String,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  token: [{ type: String }],
});

export default model("User", userSchema);
