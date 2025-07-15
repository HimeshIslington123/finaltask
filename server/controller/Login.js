import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Register_model } from "../model/Register_model.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Register_model.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const checkpassword = await bcrypt.compare(password, user.password);
    if (!checkpassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const jwt_token = jwt.sign(
      { user_id: user._id, user_name: user.name },
      "Brandktmn122#$%#@11",
      { expiresIn: "1h" }
    );
    console.log("Generated JWT:", jwt_token);

  res.cookie('token', jwt_token, {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 3600000,
  domain: ".onrender.com" // 👈 add this!
});

    return res.status(200).json({
      message: "Welcome to login",
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error });
  }
};

export default login;
