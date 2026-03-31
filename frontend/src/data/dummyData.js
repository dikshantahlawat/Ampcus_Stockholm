export const weeklyData = [
  { day: "Mon", steps: 4000, sleep: 6, calories: 2200, water: 1.5 },
  { day: "Tue", steps: 7000, sleep: 7, calories: 2000, water: 2.0 },
  { day: "Wed", steps: 9000, sleep: 8, calories: 1800, water: 2.2 },
  { day: "Thu", steps: 6000, sleep: 6.5, calories: 2100, water: 1.8 },
  { day: "Fri", steps: 10000, sleep: 7.5, calories: 1900, water: 2.3 },
];

export const todayStats = {
  steps: 8240,
  sleep: 7.2,
  calories: 1840,
  water: 1.8,
};

export function computeHealthScore(stats) {
  const sleepScore = (stats.sleep / 8) * 100;
  const stepsScore = (stats.steps / 10000) * 100;
  const calorieScore =
    stats.calories >= 1600 && stats.calories <= 2200 ? 100 : 60;
  const waterScore = (stats.water / 2.5) * 100;

  const rawScore =
    sleepScore * 0.3 +
    stepsScore * 0.25 +
    calorieScore * 0.2 +
    waterScore * 0.25;
  return Math.max(0, Math.min(100, Math.round(rawScore)));
}
