import mongoose, { Schema } from "mongoose";

const roomSchema = new mongoose.Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  topic: {
    type: String,
    required: true,
  },
  roomtype: {
    type: String,
    required: true,
  },
  speakers: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    required: false,
  },
});

export default mongoose.model("Rooms", roomSchema, "rooms");
