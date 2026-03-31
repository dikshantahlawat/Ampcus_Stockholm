const mongoose = require('mongoose');

// Sub-schema for individual meal entries
const mealSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },        // e.g. "dal rice"
    calories: { type: Number, default: 0 },
    imageUrl: { type: String },                    // optional meal photo upload
    classifiedAs: { type: String },               // result from food CNN (optional)
  },
  { _id: false }
);

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
      // Store as start-of-day UTC for consistent time-series queries
    },
    sleep: {
      hours: { type: Number, min: 0, max: 24, default: 0 },
      quality: { type: String, enum: ['poor', 'fair', 'good', 'excellent'] },
    },
    steps: {
      type: Number,
      min: 0,
      default: 0,
    },
    meals: [mealSchema],
    totalCalories: {
      type: Number,
      default: 0,
    },
    water: {
      // water intake in litres
      type: Number,
      min: 0,
      default: 0,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

// Compound index: one log per user per day
activityLogSchema.index({ user: 1, date: 1 }, { unique: true });

// Auto-calculate totalCalories from meals before saving
activityLogSchema.pre('save', function (next) {
  if (this.meals && this.meals.length > 0) {
    this.totalCalories = this.meals.reduce((sum, m) => sum + (m.calories || 0), 0);
  }
  next();
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
