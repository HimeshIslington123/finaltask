import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import { ConnectDb } from "./config/Db.js";
import { task } from "./controller/task_controller.js";
import { All } from "./controller/getAllTask.js";
import { task_model } from "./model/task_models.js";
import { Register_model } from "./model/Register_model.js"; // 👈 Import user model
import register_controller from "./controller/register_controller.js";
import login from "./controller/Login.js";
import cookieParser from "cookie-parser"; // 🔐 Required to read cookiesauth
import authenticate from "./middleware/authToken.js";
import { allforamdin } from "./controller/getalltaskadmin.js";

const app = express();
const Port = process.env.PORT || 3001;



app.use(cors({
  origin: "https://finaltask-fortentend.onrender.com",
  credentials: true                 // 👈 allow cookies to be sent
}));
app.use(cookieParser()); 

app.use(express.json()); // Parse JSON from request body

// Connect to database
async function getConnection() {
  await ConnectDb();
  console.log("finallyd done");
  
}
getConnection();

// Routes
app.get("/", (req, res) => {
  console.log("home page");
  res.send("Welcome to home page");
});

app.post("/task", task);
app.get("/getAllTask",authenticate, All);


//all for amdin


app.get("/taskall", allforamdin);







app.put("/updateStatus/:id",authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await task_model.findByIdAndUpdate(
      id,
      { status: "complete" },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task status updated to complete" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task", error });
  }
});

//chekc login
app.get("/isLoggedIn", authenticate, (req, res) => {
  res.status(200).json({ loggedIn: true, user: req.user });
});


//all user data


app.get("/users", async (req, res) => {
  try {
    const users = await Register_model.find({}, "name email"); // Only get name & email
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});


// ✅ Register route
app.post("/register",register_controller)

app.post("/login",login)

// Start server
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
