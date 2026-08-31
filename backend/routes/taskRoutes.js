const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// ================================================
// TASK VALIDATION HELPER
// ================================================
const validateTask = (body, isUpdate = false) => {
  const errors = [];

  if (!isUpdate || body.title !== undefined) {
    if (!body.title || !body.title.toString().trim()) {
      errors.push({ field: "title", message: "Title is required" });
    } else if (typeof body.title !== "string") {
      errors.push({ field: "title", message: "Title must be a string" });
    }
  }

  if (body.completed !== undefined) {
    if (typeof body.completed !== "boolean") {
      errors.push({ field: "completed", message: "Completed must be a boolean" });
    }
  }

  if (body.priority !== undefined) {
    const allowed = ["low", "medium", "high"];
    if (!allowed.includes(body.priority)) {
      errors.push({ field: "priority", message: "Priority must be one of: low, medium, high" });
    }
  }

  return errors;
};

// All task routes are protected — authMiddleware runs first on every route

// =======================
// GET ALL TASKS
// =======================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
});

// =======================
// GET TASK BY ID
// =======================
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid task ID",
    });
  }
});

// =======================
// CREATE TASK
// =======================
router.post("/", authMiddleware, async (req, res) => {
  // Server-side validation before hitting MongoDB
  const errors = validateTask(req.body, false);
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (err) {
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
    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
});

// =======================
// UPDATE TASK
// =======================
router.put("/:id", authMiddleware, async (req, res) => {
  // Validate only supplied fields
  const errors = validateTask(req.body, true);
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    res.json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (err) {
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
    res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
});

// =======================
// DELETE TASK
// =======================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid task ID",
    });
  }
});

module.exports = router;
