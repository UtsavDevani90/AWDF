import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ─────────────────────────────────────────────────────────────────────────────
// PrivateRoute — wraps a route that requires authentication
// If the user is not logged in, redirects to /login
// ─────────────────────────────────────────────────────────────────────────────

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
