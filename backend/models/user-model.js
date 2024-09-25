import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    emailId: {
      type: String,
      required: true,
    },
    activated: {
      type: Boolean,
      required: true,
      default: false,
    },
    userName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    signedUpwithGoogle: {
      type: Boolean,
      required: true,
    },
    coverPhoto: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
