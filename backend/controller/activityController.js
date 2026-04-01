import Activity from "../models/Activity.js";
import cloudinary from "cloudinary";

export const addActivity = async (req, res) => {
  try {
    const { sleep, steps, calories, water, meal } = req.body;

    let fileUrl = "";

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

    const activity = await Activity.create({
      userId: req.user.id,
      sleep,
      steps,
      calories,
      water,
      meal,
      file: fileUrl, 
    });

    res.status(200).json(activity);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error saving activity" });
  }
};

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
