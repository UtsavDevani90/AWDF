import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

// Static nav links — all existing portfolio links preserved
const NAV_LINKS = [
  { to: "/",        label: "Home"     },
  { to: "/about",   label: "About"    },
  { to: "/skills",  label: "Skills"   },
  { to: "/projects",label: "Projects" },
  { to: "/resume",  label: "Resume"   },
  { to: "/tasks",   label: "Tasks"    },
  { to: "/contact", label: "Contact"  },
];

const Navbar = ({ theme, setTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          &lt;Portfolio /&gt;
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side: theme + auth buttons + hamburger */}
        <div className="nav-right">
          <ThemeToggle theme={theme} setTheme={setTheme} />

          {/* Auth controls — desktop */}
          <div className="nav-auth">
            {isAuthenticated ? (
              <>
                <span className="nav-user-greeting">
                  👋 {user?.name?.split(" ")[0] || "User"}
                </span>
                <button
                  id="nav-logout-btn"
                  className="nav-auth-btn nav-auth-btn--logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  id="nav-login-link"
                  className={({ isActive }) =>
                    `nav-auth-btn nav-auth-btn--login${isActive ? " active" : ""}`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  id="nav-register-link"
                  className={({ isActive }) =>
                    `nav-auth-btn nav-auth-btn--register${isActive ? " active" : ""}`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Hamburger button */}
          <button
            className={menuOpen ? "hamburger open" : "hamburger"}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu — conditional rendering */}
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}

          {/* Mobile auth controls */}
          <div className="mobile-auth">
            {isAuthenticated ? (
              <button
                className="nav-auth-btn nav-auth-btn--logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `nav-auth-btn nav-auth-btn--login${isActive ? " active" : ""}`
                  }
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `nav-auth-btn nav-auth-btn--register${isActive ? " active" : ""}`
                  }
                  onClick={closeMenu}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
