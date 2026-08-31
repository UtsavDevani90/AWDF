const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ── Route modules ──────────────────────────────────────────────────────────
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors());

// ── MongoDB Connection ─────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ── Home Route ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Management API — Practical 7",
    endpoints: {
      register: "POST /auth/register",
      login:    "POST /auth/login",
      tasks:    "GET|POST|PUT|DELETE /tasks  (requires Authorization: Bearer <token>)",
    },
  });
});

// ── Auth Routes (public) ───────────────────────────────────────────────────
// POST /auth/register
// POST /auth/login
app.use("/auth", authRoutes);

// ── Task Routes (protected by authMiddleware inside taskRoutes.js) ─────────
// GET    /tasks
// GET    /tasks/:id
// POST   /tasks
// PUT    /tasks/:id
// DELETE /tasks/:id
app.use("/tasks", taskRoutes);

// ── 404 Handler ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ── Global Error Handler ───────────────────────────────────────────────────
// Catches any errors passed via next(err)
// Never exposes raw Mongoose/internal error objects
app.use((err, req, res, _next) => {
  console.error("Unhandled error:", err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate key — resource already exists",
    });
  }

  // Generic server error — never leak internals
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// ── Start Server ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});