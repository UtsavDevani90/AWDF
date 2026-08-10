const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Task = require("./models/Task");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("Server is Running...");
});

// =======================
// GET ALL TASKS
// =======================
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks"
    });
  }
});

// =======================
// GET TASK BY ID
// =======================
app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.json({
      success: true,
      data: task
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid task ID"
    });
  }
});

// =======================
// CREATE TASK
// =======================
app.post("/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });

  } catch (err) {

    // Mongoose validation error
    if (err.name === "ValidationError") {

      const errors = {};

      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create task"
    });
  }
});

// =======================
// UPDATE TASK
// =======================
app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.json({
      success: true,
      message: "Task updated successfully",
      data: task
    });

  } catch (err) {

    if (err.name === "ValidationError") {

      const errors = {};

      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update task"
    });
  }
});

// =======================
// DELETE TASK
// =======================
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.json({
      success: true,
      message: "Task deleted successfully"
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid task ID"
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});