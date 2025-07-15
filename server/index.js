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
import { allforamdin } from "./controller/getalltaskadmin.js"
import { HolidayModel } from "./model/holiday.js";
import { Add_notice_model } from "./model/addnotice.js";



const app = express();
const PORT = 3001;



app.use(cors({
  origin: "https://finaltask-1u.onrender.com",  // your frontend deployed URL here
  credentials: true
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



app.post("/addNotice", async (req, res) => {
  try {
    console.log("📩 Received notice data:", req.body.datas);
    const { title, description, noticer } = req.body.datas;

    if (!title || !description || !noticer) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const add = new Add_notice_model({ title, description, noticer });
    await add.save();
    res.status(200).json({ message: "Notice added" });
  } catch (error) {
    console.error("Error adding notice:", error);
    res.status(500).json({ error: "Failed to add notice" });
  }
});




app.get("/users", async (req, res) => {
  try {
    const users = await Register_model.find({}, "name email"); // Only get name & email
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});

// ----- Controller function -----
app.post("/submitholiday", authenticate, async (req, res) => {
  try {
  
    const { title, description, date } = req.body;


    if (!title || !description || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newHoliday = new HolidayModel({
      title,
      reason: description,
      date,
       user: req.user.user_id, // 🧠 assuming authenticate middleware sets req.user
    });

    await newHoliday.save();

    res.status(200).json({ message: "Holiday request submitted successfully." });
  } catch (error) {
    console.error("❌ Error submitting holiday:", error);
    res.status(500).json({ message: "Server error while submitting holiday." });
  }
});




// ✅ Register route
app.post("/register",register_controller)

app.post("/login",login)

app.delete("/deltename/:name",async (req,res)=>{

  const {name}=req.params;
 try {
   const deleteuser= await Register_model.findOneAndDelete({name});
  res.status(200)
  .json({message:"sucesuflly delete"})
  
 } catch (error) {
  console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user", error });

  
 }


})

//all notice

app.get("/getnotice", async (req, res) => {
  try {
    const data = await Add_notice_model.find({});
    res.status(200).json({ data }); // Wrap in an object with a "data" field
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notices" });
  }
});






app.get("/admin/allholidays", authenticate, async (req, res) => {
  try {
    const holidays = await HolidayModel.find()
      .populate("user", "name email") // fetch user name & email only
      .sort({ createdAt: -1 });

    res.status(200).json({ holidays });
  } catch (error) {
    console.error("Error fetching holidays:", error);
    res.status(500).json({ message: "Server error fetching holidays." });
  }
});


app.patch("/admin/updateHoliday/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedHoliday = await HolidayModel.findByIdAndUpdate(
      req.params.id,
      { approved: status },
      { new: true }
    );

    if (!updatedHoliday) {
      return res.status(404).json({ message: "Holiday not found" });
    }

    res.status(200).json({ message: "Status updated", holiday: updatedHoliday });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get("/user/myholidays", authenticate, async (req, res) => {
  try {
    const userId = req.user.user_id; // From token via middleware

    const holidays = await HolidayModel.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ holidays });
  } catch (error) {
    console.error("Error fetching user holidays:", error);
    res.status(500).json({ message: "Server error fetching user holidays." });
  }
});


app.post("/logout", (req, res) => {
  res.clearCookie("token"); // Clear the cookie set during login
  res.status(200).json({ message: "Logged out successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server runninddg at http://0.0.0.0:${PORT}`);
});
