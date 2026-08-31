const jwt = require("jsonwebtoken");

// =============================================
// AUTH MIDDLEWARE
// Reads Authorization: Bearer <token>
// Verifies JWT and attaches req.user
// =============================================

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check header exists and has correct format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication token required",
    });
  }

  const token = authHeader.split(" ")[1];

  // 2. Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user payload (id) to request
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
