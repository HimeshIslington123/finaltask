import mongoose from "mongoose";
const task_scheme=mongoose.Schema({
    title:String,
    description:String,
    assignto:String,
    duedate:Date,
    status:String,
    assigndate:Date




})

export const task_model=mongoose.model("task_table",task_scheme)