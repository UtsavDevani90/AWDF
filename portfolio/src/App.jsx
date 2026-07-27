import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return localStorage.getItem("theme") || "light";
  });

  const [loading, setLoading] = useState(true);
  const [scrollPct, setScrollPct] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowTop(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (loading) {
    return (
      <div className={theme === "light" ? "light-theme" : "dark-theme"}>
        <div className="loading-screen">
          <div className="loading-spinner" />
          <p style={{ color: "var(--text-muted)" }}>
            {theme === "light" ? "Loading Portfolio..." : "Loading Portfolio..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={theme === "light" ? "light-theme" : "dark-theme"}>
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />
      <Navbar theme={theme} setTheme={setTheme} />
      <AppRoutes theme={theme} />
      <Footer />

      {showTop && (
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          ↑
        </button>
      )}
    </div>
  );
};

export default App;
