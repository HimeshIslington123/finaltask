// controller/getAllTask.js
import { task_model } from "../model/task_models.js";

export const All = async (req, res) => {
  try {
    const userName = req.user.user_name; // From JWT token

    const tasks = await task_model.find({ assignto: userName });
    res.status(200).json({ data: tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

