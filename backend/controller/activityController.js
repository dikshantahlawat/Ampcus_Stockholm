import Activity from "../models/Activity.js";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const computeHealthScore = ({ sleep, steps, calories, water }) => {
  const sleepScore = clamp((Number(sleep) / 8) * 100, 0, 100);
  const stepsScore = clamp((Number(steps) / 10000) * 100, 0, 100);
  const calorieDistance = Math.abs(Number(calories) - 2200);
  const caloriesScore = clamp(100 - (calorieDistance / 1200) * 100, 0, 100);
  const waterScore = clamp((Number(water) / 3) * 100, 0, 100);

  return Math.round(
    sleepScore * 0.3 +
      stepsScore * 0.25 +
      caloriesScore * 0.2 +
      waterScore * 0.25,
  );
};

const getUserId = (req) => {
  const fromHeader = req.headers["x-user-id"];
  const fromQuery = req.query.userId;
  const fromBody = req.body.userId;
  return String(fromHeader || fromQuery || fromBody || "guest-user");
};

export const addActivity = async (req, res) => {
  try {
    const { sleep, steps, calories, water, meal } = req.body;

    if (
      !Number.isFinite(Number(sleep)) ||
      !Number.isFinite(Number(steps)) ||
      !Number.isFinite(Number(calories)) ||
      !Number.isFinite(Number(water))
    ) {
      return res.status(400).json({ msg: "sleep, steps, calories and water are required numeric values" });
    }

    const userId = getUserId(req);
    const healthScore = computeHealthScore({ sleep, steps, calories, water });

    const activity = await Activity.create({
      userId,
      sleep,
      steps,
      calories,
      water,
      meal,
      healthScore,
    });

    res.status(200).json(activity);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error saving activity" });
  }
};

export const getActivities = async (req, res) => {
  try {
    const userId = getUserId(req);
    const data = await Activity.find({
      userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching activities" });
  }
};

export const getDashboardAggregation = async (req, res) => {
  try {
    const userId = getUserId(req);
    const days = Math.max(1, Number(req.query.days || 5));

    const logs = await Activity.find({ userId })
      .sort({ date: -1 })
      .limit(days);

    const ordered = [...logs].reverse();
    const latest = logs[0];

    const weeklyData = ordered.map((log) => ({
      day: new Date(log.date).toLocaleDateString("en-US", { weekday: "short" }),
      date: log.date,
      sleep: log.sleep,
      steps: log.steps,
      calories: log.calories,
      water: log.water,
      healthScore: log.healthScore,
    }));

    const todayStats = latest
      ? {
          sleep: latest.sleep,
          steps: latest.steps,
          calories: latest.calories,
          water: latest.water,
          healthScore: latest.healthScore,
        }
      : {
          sleep: 0,
          steps: 0,
          calories: 0,
          water: 0,
          healthScore: 0,
        };

    res.status(200).json({ todayStats, weeklyData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error generating dashboard aggregation" });
  }
};

export const getInsightsAggregation = async (req, res) => {
  try {
    const userId = getUserId(req);
    const days = Math.max(1, Number(req.query.days || 7));

    const logs = await Activity.find({ userId })
      .sort({ date: -1 })
      .limit(days);

    if (!logs.length) {
      return res.status(200).json({
        averages: { sleep: 0, steps: 0, calories: 0, water: 0, healthScore: 0 },
      });
    }

    const totals = logs.reduce(
      (acc, log) => {
        acc.sleep += log.sleep;
        acc.steps += log.steps;
        acc.calories += log.calories;
        acc.water += log.water;
        acc.healthScore += log.healthScore;
        return acc;
      },
      { sleep: 0, steps: 0, calories: 0, water: 0, healthScore: 0 },
    );

    const count = logs.length;
    res.status(200).json({
      averages: {
        sleep: Number((totals.sleep / count).toFixed(1)),
        steps: Math.round(totals.steps / count),
        calories: Math.round(totals.calories / count),
        water: Number((totals.water / count).toFixed(1)),
        healthScore: Math.round(totals.healthScore / count),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error generating insights aggregation" });
  }
};