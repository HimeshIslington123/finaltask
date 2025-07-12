import bcrypt from "bcrypt"
import { Register_model } from "../model/Register_model.js";

const register_controller = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    if (!email || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Register_model.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashpassword=await bcrypt.hash(password,10);

    const newUser = new Register_model({ email, name, password:hashpassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default register_controller;
