import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  // If already logged in, skip login page
  useEffect(() => {
    document.title = "Login | My Portfolio";
    if (isAuthenticated) navigate("/tasks", { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim())    { setError("Email is required");    return; }
    if (!password.trim()) { setError("Password is required"); return; }

    try {
      setLoading(true);
      const result = await loginUser({ email, password });

      if (!result.success) {
        setError(result.message || "Login failed");
        return;
      }

      // Save token + user in context (also persists to localStorage)
      login(result.token, result.user);
      navigate("/tasks", { replace: true });

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
          <div className="auth-icon">🔐</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account to manage tasks</p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="auth-error" role="alert">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="login-email">
              Email <span className="accent">*</span>
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">
              Password <span className="accent">*</span>
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button
            id="login-submit"
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="auth-btn-loading">
                <span className="auth-spinner" /> Signing in…
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer link */}
        <p className="auth-footer-text">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="auth-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
