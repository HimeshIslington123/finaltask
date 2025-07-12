import { task_model } from "../model/task_models.js";

export const allforamdin = async (req, res) => {
  try {
    const all = await task_model.find();

    res.status(200).json({
      message: "Successful",
      data: all,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};
