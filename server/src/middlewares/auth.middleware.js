import "dotenv/config.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    // Expected format:
    // Authorization: Bearer <token>
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        message: "Invalid authorization format.",
      });
    }

    const token = parts[1];

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach authenticated user information
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.error("❌ Authentication error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;