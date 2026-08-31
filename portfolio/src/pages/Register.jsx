import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState([]);
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    document.title = "Register | My Portfolio";
    if (isAuthenticated) navigate("/tasks", { replace: true });
  }, [isAuthenticated, navigate]);

  // Map server field errors to a lookup for easy display
  const fieldError = (field) => {
    const found = errors.find((e) => e.field === field);
    return found ? found.message : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setError("");
    setSuccess("");

    // Basic client-side pre-check
    if (!name.trim())     { setError("Name is required");     return; }
    if (!email.trim())    { setError("Email is required");    return; }
    if (!password.trim()) { setError("Password is required"); return; }

    try {
      setLoading(true);
      const result = await registerUser({ name, email, password });

      if (!result.success) {
        // Field-level validation errors from server
        if (result.errors && Array.isArray(result.errors)) {
          setErrors(result.errors);
        } else {
          setError(result.message || "Registration failed");
        }
        return;
      }

      setSuccess("🎉 Account created! Redirecting to login…");
      setTimeout(() => navigate("/login"), 1800);

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Header */}
        <div className="auth-header">
          <div className="auth-icon">🚀</div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join today and start managing your tasks</p>
        </div>

        {/* Success Banner */}
        {success && (
          <div className="auth-success" role="status">
            {success}
          </div>
        )}

        {/* Global Error Banner */}
        {error && (
          <div className="auth-error" role="alert">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="reg-name">
              Full Name <span className="accent">*</span>
            </label>
            <input
              id="reg-name"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className={fieldError("name") ? "input-error" : ""}
              autoComplete="name"
            />
            {fieldError("name") && (
              <span className="field-error-msg">{fieldError("name")}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="reg-email">
              Email <span className="accent">*</span>
            </label>
            <input
              id="reg-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className={fieldError("email") ? "input-error" : ""}
              autoComplete="email"
            />
            {fieldError("email") && (
              <span className="field-error-msg">{fieldError("email")}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="reg-password">
              Password <span className="accent">*</span>
            </label>
            <input
              id="reg-password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className={fieldError("password") ? "input-error" : ""}
              autoComplete="new-password"
            />
            {fieldError("password") && (
              <span className="field-error-msg">{fieldError("password")}</span>
            )}
          </div>

          <button
            id="reg-submit"
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="auth-btn-loading">
                <span className="auth-spinner" /> Creating account…
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer link */}
        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
