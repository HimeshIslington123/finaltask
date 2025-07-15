import { HolidayModel } from "../model/noticesubmit";

export const submitHoliday = async (req, res) => {
  try {
    const { title, reason, date } = req.body;

    if (!title || !reason || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newHoliday = new HolidayModel({ title, reason, date });
    await newHoliday.save();

    res.status(200).json({ message: "Holiday request submitted successfully." });
  } catch (error) {
    console.error("❌ Error in submitHoliday controller:", error);
    res.status(500).json({ message: "Server error while submitting holiday." });
  }
};
