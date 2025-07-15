import mongoose from "mongoose";

const AddNoticeSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
    
  },
  description: {
    type: String,
    required: true,
  },
  noticer: {
    type: String,
    required: true,
   
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

 export const Add_notice_model = mongoose.model("AddNotice", AddNoticeSchema);


