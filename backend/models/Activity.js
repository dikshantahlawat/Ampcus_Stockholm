import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    sleep: {
      type: Number,
      required: true,
    },

    steps: {
      type: Number,
      required: true,
    },

    calories: {
      type: Number,
      required: true,
    },

    water: {
      type: Number,
      required: true,
    },

    meal: {
      type: String,
      default: "",
    },

    healthScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Activity", activitySchema);
