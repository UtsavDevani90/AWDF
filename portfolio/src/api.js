const BASE_URL = "http://localhost:5001";

// ─── Auth header helper ────────────────────────────────────────────────────
// Reads JWT from localStorage and returns Authorization header object
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ─────────────────────────────────────────────────────────────────────────────
// AUTH API
// ─────────────────────────────────────────────────────────────────────────────

// POST /auth/register
export const registerUser = async (data) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

// POST /auth/login
export const loginUser = async (data) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

// ─────────────────────────────────────────────────────────────────────────────
// TASK API  (all requests include Authorization: Bearer <token>)
// ─────────────────────────────────────────────────────────────────────────────

// GET /tasks — Get all tasks
export const getTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw Object.assign(new Error(body.message || "Failed to fetch tasks"), {
      status: response.status,
    });
  }

  return response.json();
};

// POST /tasks — Create a new task
export const createTask = async (task) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw Object.assign(new Error(body.message || "Failed to create task"), {
      status: response.status,
    });
  }

  return response.json();
};

// PUT /tasks/:id — Update an existing task
export const updateTask = async (id, task) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw Object.assign(new Error(body.message || "Failed to update task"), {
      status: response.status,
    });
  }

  return response.json();
};

// DELETE /tasks/:id — Delete a task
export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw Object.assign(new Error(body.message || "Failed to delete task"), {
      status: response.status,
    });
  }

  return response.json();
};