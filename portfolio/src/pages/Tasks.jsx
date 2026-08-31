import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, createTask, updateTask, deleteTask } from "../api";
import { useAuth } from "../context/AuthContext";

// Priority badge config — maps value → label + CSS modifier class
const PRIORITY_META = {
  low:    { label: "Low",    cls: "task-priority-low"    },
  medium: { label: "Medium", cls: "task-priority-medium" },
  high:   { label: "High",   cls: "task-priority-high"   },
};

function Tasks() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // ── State declarations (ALL must come first before any function uses them) ──

  const [tasks,       setTasks]       = useState([]);

  // Add-task form fields
  const [title,       setTitle]       = useState("");
  const [description, setDescription] = useState("");
  const [priority,    setPriority]    = useState("medium");

  // editingTask holds a COPY of the task being edited, or null when not editing
  const [editingTask, setEditingTask] = useState(null);

  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ── 401 handler — clears token and redirects to login ───────────────────
  const handle401 = useCallback(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  // ── Helpers ───────────────────────────────────────────────────────────────

  // Show a timed success banner
  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  // ── GET /tasks ────────────────────────────────────────────────────────────

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await getTasks();
      setTasks(result.data);
    } catch (err) {
      if (err.status === 401) { handle401(); return; }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Tasks | My Portfolio";
    loadTasks();
  }, []);

  // ── POST /tasks ───────────────────────────────────────────────────────────

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) { setError("Title is required"); return; }

    try {
      setLoading(true);
      setError("");
      const result = await createTask({ title, description, priority });
      setTasks((prev) => [...prev, result.data]);
      setTitle("");
      setDescription("");
      setPriority("medium");
      showSuccess("✅ Task created successfully!");
    } catch (err) {
      if (err.status === 401) { handle401(); return; }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── PUT /tasks/:id — toggle completed (Mark Complete / Mark Pending) ──────

  const handleUpdate = async (task) => {
    try {
      setLoading(true);
      setError("");
      const result = await updateTask(task._id, {
        title:       task.title,
        description: task.description,
        priority:    task.priority,
        completed:   !task.completed,   // flip the flag
      });
      setTasks((prev) =>
        prev.map((t) => (t._id === result.data._id ? result.data : t))
      );
      showSuccess(`✅ Task marked as ${result.data.completed ? "complete" : "pending"}!`);
    } catch (err) {
      if (err.status === 401) { handle401(); return; }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── EDIT — open inline form pre-filled with the task's current values ─────

  // Step 1: user clicks Edit → copy task into editingTask state
  const handleEdit = (task) => {
    setError("");           // clear any previous error
    setEditingTask({
      _id:         task._id,
      title:       task.title,
      description: task.description,
      priority:    task.priority,
      completed:   task.completed,
    });
  };

  // Step 2: user clicks Cancel → discard changes, close form
  const handleCancelEdit = () => {
    setEditingTask(null);
    setError("");
  };

  // Step 3: user clicks Save → PUT /tasks/:id with edited values
  const handleSaveEdit = async () => {
    // Basic validation
    if (!editingTask.title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Call the existing updateTask from api.js
      const result = await updateTask(editingTask._id, {
        title:       editingTask.title,
        description: editingTask.description,
        completed:   editingTask.completed,   // preserve current completed state
        priority:    editingTask.priority,
      });

      // Replace the old task in state with the updated one returned by backend
      setTasks((prev) =>
        prev.map((t) => (t._id === result.data._id ? result.data : t))
      );

      // Close the edit form only after a successful save
      setEditingTask(null);
      showSuccess("✅ Task updated successfully!");

    } catch (err) {
      if (err.status === 401) { handle401(); return; }
      // Keep the form open so the user can retry
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── DELETE /tasks/:id ─────────────────────────────────────────────────────

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      setLoading(true);
      setError("");
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      showSuccess("🗑️ Task deleted successfully!");
    } catch (err) {
      if (err.status === 401) { handle401(); return; }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="page">
      <div className="container tasks-container">

        {/* Page heading */}
        <h2 className="section-title">
          Task <span className="accent">Management</span>
        </h2>
        <p className="section-subtitle">Manage your tasks efficiently</p>

        {/* Success banner */}
        {successMsg && (
          <div className="success-msg" role="status">
            {successMsg}
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="task-error-msg" role="alert">
            ⚠️ {error}
          </div>
        )}

        {/* ── Add Task card ──────────────────────────────────────────────── */}
        <div className="task-form-card">
          <h3 className="task-form-title">Add New Task</h3>

          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label htmlFor="task-title">Title <span className="accent">*</span></label>
              <input
                id="task-title"
                type="text"
                placeholder="Enter task title…"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="task-desc">Description</label>
              <textarea
                id="task-desc"
                placeholder="Enter task description…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="task-form-row">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="task-priority">Priority</label>
                <select
                  id="task-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  disabled={loading}
                  className="task-select"
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-accent task-submit-btn"
                disabled={loading}
              >
                {loading ? "Saving…" : "+ Add Task"}
              </button>
            </div>
          </form>
        </div>

        {/* ── Task list ──────────────────────────────────────────────────── */}

        {loading && tasks.length === 0 && (
          <div className="task-loading">
            <div className="loading-spinner" />
            <p>Loading tasks…</p>
          </div>
        )}

        {!loading && tasks.length === 0 && !error && (
          <div className="task-empty">
            <span className="task-empty-icon">📋</span>
            <p>No tasks yet. Add your first task above!</p>
          </div>
        )}

        {tasks.length > 0 && (
          <div className="task-grid">
            {tasks.map((task) => {
              const pm = PRIORITY_META[task.priority] ?? PRIORITY_META.medium;

              // ── Ternary: if THIS task is being edited, show the edit form ──
              // ── otherwise show the normal read-only card ──────────────────
              const isEditing = editingTask && editingTask._id === task._id;

              return (
                <div
                  key={task._id}
                  className={task.completed ? "task-card task-card--done" : "task-card"}
                >
                  {isEditing ? (
                    /* ── EDIT FORM (inline, replaces card content) ── */
                    <div className="task-edit-form">
                      <h4 className="task-edit-title">✏️ Edit Task</h4>

                      {/* Title */}
                      <div className="form-group">
                        <label htmlFor={`edit-title-${task._id}`}>Title <span className="accent">*</span></label>
                        <input
                          id={`edit-title-${task._id}`}
                          type="text"
                          value={editingTask.title}
                          onChange={(e) =>
                            setEditingTask({ ...editingTask, title: e.target.value })
                          }
                          disabled={loading}
                        />
                      </div>

                      {/* Description */}
                      <div className="form-group">
                        <label htmlFor={`edit-desc-${task._id}`}>Description</label>
                        <textarea
                          id={`edit-desc-${task._id}`}
                          value={editingTask.description}
                          onChange={(e) =>
                            setEditingTask({ ...editingTask, description: e.target.value })
                          }
                          disabled={loading}
                        />
                      </div>

                      {/* Priority */}
                      <div className="form-group">
                        <label htmlFor={`edit-priority-${task._id}`}>Priority</label>
                        <select
                          id={`edit-priority-${task._id}`}
                          value={editingTask.priority}
                          onChange={(e) =>
                            setEditingTask({ ...editingTask, priority: e.target.value })
                          }
                          disabled={loading}
                          className="task-select"
                        >
                          <option value="low">🟢 Low</option>
                          <option value="medium">🟡 Medium</option>
                          <option value="high">🔴 High</option>
                        </select>
                      </div>

                      {/* Save + Cancel */}
                      <div className="task-edit-actions">
                        <button
                          className="task-btn-save"
                          onClick={handleSaveEdit}
                          disabled={loading}
                        >
                          {loading ? "Saving…" : "💾 Save"}
                        </button>
                        <button
                          className="task-btn-cancel"
                          onClick={handleCancelEdit}
                          disabled={loading}
                        >
                          ✕ Cancel
                        </button>
                      </div>
                    </div>

                  ) : (

                    /* ── READ-ONLY CARD VIEW ── */
                    <>
                      {/* Header: title + priority badge */}
                      <div className="task-card-header">
                        <h3 className="task-card-title">{task.title}</h3>
                        <span className={`task-priority-badge ${pm.cls}`}>
                          {pm.label}
                        </span>
                      </div>

                      {/* Description */}
                      {task.description && (
                        <p className="task-card-desc">{task.description}</p>
                      )}

                      {/* Status badge */}
                      <div className="task-card-meta">
                        <span
                          className={
                            task.completed
                              ? "task-status-badge task-status--done"
                              : "task-status-badge task-status--pending"
                          }
                        >
                          {task.completed ? "✅ Completed" : "⏳ Pending"}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="task-card-actions">
                        <button
                          className="task-btn-edit"
                          onClick={() => handleEdit(task)}
                          disabled={loading}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          className="task-btn-toggle"
                          onClick={() => handleUpdate(task)}
                          disabled={loading}
                        >
                          {task.completed ? "↩ Mark Pending" : "✔ Mark Complete"}
                        </button>

                        <button
                          className="task-btn-delete"
                          onClick={() => handleDelete(task._id)}
                          disabled={loading}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default Tasks;
