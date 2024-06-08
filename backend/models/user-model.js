import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
    },
    activated: {
      type: Boolean,
      required: true,
      default: false,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
