import { createContext, useContext, useState, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// AuthContext — provides { user, token, login, logout } to the entire app
// ─────────────────────────────────────────────────────────────────────────────

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialise from localStorage so state survives page refresh
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("authUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Called after a successful login API call
  const login = useCallback((newToken, userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("authUser", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  }, []);

  // Called on Logout button click or on 401 response
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    setToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook — use this everywhere instead of useContext(AuthContext) directly
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};

export default AuthContext;
