import { task_model } from "../model/task_models.js";

export const task = async (req, res) => {
  try {
    const { title, description, assignto, assigndate, duedate, status } = req.body;
    const newTask = new task_model({ title, description, assignto, assigndate, duedate, status });
    await newTask.save();
    res.status(201).json({ message: "Task saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving task", error });
  }
};

