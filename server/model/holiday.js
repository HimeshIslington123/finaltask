import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  title: { type: String, required: true },
  reason: { type: String, required: true },
  date: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Register_table" },
  approved: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" } // new field
}, { timestamps: true });

export const HolidayModel = mongoose.model("holiday_requests", holidaySchema);
