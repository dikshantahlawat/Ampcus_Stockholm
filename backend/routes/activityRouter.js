import express from "express";
import { addActivity, getActivities } from "../controller/activityController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addActivity);
router.get("/", protect, getActivities);

export default router;
