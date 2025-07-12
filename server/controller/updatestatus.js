import { task_model } from "../model/task_models";



export const Updatestatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  try {
    const updatedTask = await task_model.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated", data: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

