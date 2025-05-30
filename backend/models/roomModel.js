import mongoose, { Schema } from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    topic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    aboutWhat: {
      type: String,
      required: true,
    },
    memberList: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      required: false,
    },
    removedList: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      required: false,
    },
    allCanSpeak: { type: Boolean, required: true },
    accessibility: {
      type: String,
      required: true,
    },
    waitingList: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      required: false,
    },
    speakers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Rooms', roomSchema, 'rooms');
