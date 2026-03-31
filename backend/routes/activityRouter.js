import express from "express";
import {
	addActivity,
	getActivities,
	getDashboardAggregation,
	getInsightsAggregation,
} from "../controller/activityController.js";

const router = express.Router();

router.post("/logs", addActivity);
router.get("/logs", getActivities);
router.get("/aggregation/dashboard", getDashboardAggregation);
router.get("/aggregation/insights", getInsightsAggregation);

export default router;