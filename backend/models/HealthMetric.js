const mongoose = require('mongoose');

const healthMetricSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },

    // --- Computed health score (0–100) ---
    healthScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    // Breakdown of the score for UI display
    scoreBreakdown: {
      sleepScore:  { type: Number, min: 0, max: 100 },  // 40% weight
      stepsScore:  { type: Number, min: 0, max: 100 },  // 35% weight
      mealsScore:  { type: Number, min: 0, max: 100 },  // 25% weight
    },

    // --- Risk level derived from health score ---
    riskLevel: {
      type: String,
      enum: ['low', 'moderate', 'high'],
    },

    // --- ML predictions from Python microservice ---
    predictedStepsTomorrow: {
      type: Number,
    },
    predictedSleepTomorrow: {
      type: Number,
    },
    trend: {
      // 'improving' | 'stable' | 'declining'
      type: String,
      enum: ['improving', 'stable', 'declining'],
    },
  },
  { timestamps: true }
);

// One metric document per user per day
healthMetricSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('HealthMetric', healthMetricSchema);
