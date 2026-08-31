const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// ================================================
// VALIDATION HELPERS
// ================================================

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ================================================
// POST /auth/register
// ================================================
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const errors = [];

  // Server-side input validation
  if (!name || !name.toString().trim()) {
    errors.push({ field: "name", message: "Name is required" });
  }
  if (!email || !email.toString().trim()) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!validateEmail(email.toString().trim())) {
    errors.push({ field: "email", message: "Valid email is required" });
  }
  if (!password) {
    errors.push({ field: "password", message: "Password is required" });
  } else if (password.toString().length < 6) {
    errors.push({ field: "password", message: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  try {
    // Check for duplicate email
    const existing = await User.findOne({ email: email.toString().toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create user — password is hashed by pre-save hook in User model
    await User.create({
      name: name.toString().trim(),
      email: email.toString().toLowerCase().trim(),
      password: password.toString(),
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (err) {
    // Mongoose unique index race-condition
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }
    console.error("Register error:", err);
    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
});

// ================================================
// POST /auth/login
// ================================================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const errors = [];

  // Validation
  if (!email || !email.toString().trim()) {
    errors.push({ field: "email", message: "Email is required" });
  }
  if (!password) {
    errors.push({ field: "password", message: "Password is required" });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  try {
    // Find user by email — password is included by default
    const user = await User.findOne({ email: email.toString().toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password with bcrypt
    const isMatch = await bcrypt.compare(password.toString(), user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Sign JWT — payload contains user id
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
});

// ================================================
// GET /auth/me  — return current authenticated user
// ================================================
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // req.user is populated by authMiddleware after JWT verification
    // Fetch fresh user record from MongoDB (never rely only on JWT payload)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // user.toJSON() automatically strips the password field (see User model)
    return res.status(200).json({
      success: true,
      data: user,
    });

  } catch (err) {
    console.error("GET /auth/me error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
});

module.exports = router;
