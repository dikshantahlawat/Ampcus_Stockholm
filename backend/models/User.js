import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
  },

  age: {
    type: Number
  },

  mobile: {
    type: String
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);