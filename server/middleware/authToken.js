import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  console.log("🔒 [AUTH] Middleware triggered");

  const token = req.cookies.token;  // cookie-parser reads cookies
  if (!token) {
    console.log("❌ [AUTH] No token found");
    return res.status(401).json({ message: "Access denied. No token." });
  }

  try {
    const decoded = jwt.verify(token, "Brandktmn122#$%#@11");
    req.user = decoded;
    console.log("✅ [AUTH] Token valid for user:", decoded);
    next();
  } catch (err) {
    console.log("❌ [AUTH] Token invalid");
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default authenticate;
