const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

// 👇 Add it here
let tasks = [
  {
    id: 1,
    title: "Complete Express Practical",
    completed: false,
  },
  {
    id: 2,
    title: "Learn Middleware",
    completed: false,
  },
  {
    id: 3,
    title: "Study ANDF",
    completed: true,
  },
];

// Home Route
app.get("/", (req, res) => {
  res.send("Server is Running");
});

// GET API
app.get("/tasks", (req, res) => {
  res.json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

// POST API
app.post("/tasks", (req, res) => {
  const newTask = req.body;

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask,
  });
});

// DELETE API
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  const deletedTask = tasks.splice(index, 1)[0];

  res.json({
    success: true,
    message: "Task deleted successfully",
    deletedTask,
    remainingTasks: tasks,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});