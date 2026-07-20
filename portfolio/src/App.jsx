import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  // useState: light/dark theme — load from localStorage on init
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // useState: loading screen
  const [loading, setLoading] = useState(true);

  // useState: scroll progress bar width (%)
  const [scrollPct, setScrollPct] = useState(0);

  // useState: show/hide back-to-top button
  const [showTop, setShowTop] = useState(false);

  // useEffect: save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // useEffect: simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer); // cleanup
  }, []);

  // useEffect: scroll event for progress bar and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Ternary: avoid division by zero
      setScrollPct(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowTop(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    // Cleanup: remove event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Ternary: show loading screen while app initializes
  if (loading) {
    return (
      <div className={theme === "light" ? "light-theme" : "dark-theme"}>
        <div className="loading-screen">
          <div className="loading-spinner" />
          {/* Ternary: loading message based on theme */}
          <p style={{ color: "var(--text-muted)" }}>
            {theme === "light" ? "Loading Portfolio..." : "🌙 Loading Portfolio..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    // Ternary: apply light or dark theme class to root div
    <div className={theme === "light" ? "light-theme" : "dark-theme"}>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* Navbar — passes theme props down */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* All route definitions live in AppRoutes */}
      <AppRoutes theme={theme} />

      <Footer />

      {/* Back to Top Button — conditional rendering with ternary */}
      {showTop && (
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          ↑
        </button>
      )}
    </div>
  );
};

export default App;
