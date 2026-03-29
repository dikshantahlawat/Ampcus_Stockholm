/**
 * Computes a health score (0–100) from a single day's activity log.
 * Weights: sleep 40%, steps 35%, meals/calories 25%
 *
 * This logic lives in Node.js so the backend can compute scores
 * without always calling the ML microservice.
 */

const IDEAL_SLEEP_HOURS = 8;
const IDEAL_STEPS = 10000;
const IDEAL_CALORIES_MIN = 1500;
const IDEAL_CALORIES_MAX = 2500;

/**
 * @param {object} log - ActivityLog document
 * @returns {{ healthScore, scoreBreakdown, riskLevel }}
 */
function computeHealthScore(log) {
  // --- Sleep score ---
  const sleepHours = log.sleep?.hours || 0;
  let sleepScore = Math.min(100, (sleepHours / IDEAL_SLEEP_HOURS) * 100);
  // Penalise oversleeping (> 10 hrs)
  if (sleepHours > 10) sleepScore = Math.max(0, sleepScore - (sleepHours - 10) * 10);

  // --- Steps score ---
  const steps = log.steps || 0;
  const stepsScore = Math.min(100, (steps / IDEAL_STEPS) * 100);

  // --- Meals / calorie score ---
  const calories = log.totalCalories || 0;
  let mealsScore = 0;
  if (calories >= IDEAL_CALORIES_MIN && calories <= IDEAL_CALORIES_MAX) {
    mealsScore = 100;
  } else if (calories < IDEAL_CALORIES_MIN) {
    mealsScore = Math.max(0, (calories / IDEAL_CALORIES_MIN) * 100);
  } else {
    // Overeating penalty
    mealsScore = Math.max(0, 100 - ((calories - IDEAL_CALORIES_MAX) / 500) * 20);
  }

  // --- Weighted total ---
  const healthScore = Math.round(
    sleepScore * 0.4 + stepsScore * 0.35 + mealsScore * 0.25
  );

  // --- Risk level ---
  let riskLevel = 'low';
  if (healthScore < 40) riskLevel = 'high';
  else if (healthScore < 70) riskLevel = 'moderate';

  return {
    healthScore,
    scoreBreakdown: {
      sleepScore: Math.round(sleepScore),
      stepsScore: Math.round(stepsScore),
      mealsScore: Math.round(mealsScore),
    },
    riskLevel,
  };
}

module.exports = { computeHealthScore };
