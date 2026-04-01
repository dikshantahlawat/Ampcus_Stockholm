import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

    file: {
      type: String,
      default: "",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Activity", activitySchema);
