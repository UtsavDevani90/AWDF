// ThemeToggle — receives theme & setTheme as props
const ThemeToggle = ({ theme, setTheme }) => (
  <button
    className="theme-toggle"
    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    aria-label="Toggle theme"
  >
    {/* Ternary: show moon for light mode, sun for dark mode */}
    {theme === "light" ? "🌙 Dark" : "☀️ Light"}
  </button>
);

export default ThemeToggle;
