import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  sleep: {
    type: Number,
    required: true
  },

  steps: {
    type: Number,
    required: true
  },

  calories: {        // 🔥 ADD THIS
    type: Number,
    required: true
  },

  water: {
    type: Number,
    required: true
  },

  meal: {
    type: String,
    default: ""
  },

  file: {            // 🔥 ADD THIS (Cloudinary URL)
    type: String,
    default: ""
  },

  date: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

export default mongoose.model("Activity", activitySchema);