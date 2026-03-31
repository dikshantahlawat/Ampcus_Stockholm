// import Activity from "../models/Activity.js";

// // Add daily activity
// export const addActivity = async (req, res) => {
//   try {
//     const activity = await Activity.create({
//       ...req.body,
//       userId: req.user.id
//     });

//     res.json(activity);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// // Get all activities
// export const getActivities = async (req, res) => {
//   try {
//     const data = await Activity.find({ userId: req.user.id });
//     res.json(data);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };


import Activity from "../models/Activity.js";
import cloudinary from "cloudinary";

// ================= ADD ACTIVITY =================
export const addActivity = async (req, res) => {
  try {
    const { sleep, steps, calories, water, meal } = req.body;

    let fileUrl = "";

    // 🔥 FILE CHECK
    if (req.files && req.files.file) {
      const file = req.files.file;

      const result = await cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
          folder: "biosync",
        }
      );

      fileUrl = result.secure_url;
    }

    // 🔥 CREATE ACTIVITY
    const activity = await Activity.create({
      userId: req.user.id,
      sleep,
      steps,
      calories,
      water,
      meal,
      file: fileUrl, // 🔥 store image url
    });

    res.status(200).json(activity);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error saving activity" });
  }
};

// ================= GET ACTIVITIES =================
export const getActivities = async (req, res) => {
  try {
    const data = await Activity.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching activities" });
  }
};