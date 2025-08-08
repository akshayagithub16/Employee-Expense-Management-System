import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.userId, email: payload.email };
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
