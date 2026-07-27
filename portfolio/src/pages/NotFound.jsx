import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  // useState: controls fade-in animation trigger on mount
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Set document title for 404 page
    document.title = "404 | Page Not Found";

    // Slight delay so the CSS transition plays visibly on mount
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    // Semantic main landmark — sits between Navbar and Footer via AppRoutes
    <main className="page">
      {/*
        Outer wrapper: full height, centered, dark background with
        a subtle radial purple glow matching the portfolio accent color
      */}
      <div
        className="not-found"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(129,140,248,0.08) 0%, transparent 70%)",
        }}
      >
        {/*
          Content card — fades in on mount via opacity + translateY transition.
          Uses ternary to toggle between invisible (start) and visible (end) state.
        */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            padding: "2rem 1.5rem",
            maxWidth: "520px",
            width: "100%",
            textAlign: "center",
          }}
        >
          {/* ── Glowing 404 badge ── */}
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginBottom: "0.5rem",
            }}
          >
            {/* Soft blur glow layer behind the number */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                fontSize: "clamp(5rem, 20vw, 9rem)",
                fontWeight: 900,
                color: "var(--accent)",
                filter: "blur(32px)",
                opacity: 0.35,
                userSelect: "none",
                lineHeight: 1,
              }}
            >
              404
            </span>

            {/* Visible 404 heading */}
            <h1
              style={{
                fontSize: "clamp(5rem, 20vw, 9rem)",
                fontWeight: 900,
                lineHeight: 1,
                color: "var(--accent)",
                letterSpacing: "-4px",
                position: "relative",
              }}
            >
              404
            </h1>
          </div>

          {/* Thin accent divider */}
          <div
            aria-hidden="true"
            style={{
              width: "60px",
              height: "3px",
              borderRadius: "99px",
              background:
                "linear-gradient(90deg, var(--accent), var(--accent-2))",
              margin: "0.25rem 0",
            }}
          />

          {/* ── Page Not Found heading ── */}
          <h2
            style={{
              fontSize: "clamp(1.4rem, 4vw, 1.9rem)",
              fontWeight: 800,
              color: "var(--text)",
              letterSpacing: "-0.5px",
            }}
          >
            Page Not Found
          </h2>

          {/* ── Descriptive paragraph ── */}
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
              lineHeight: 1.7,
              maxWidth: "380px",
            }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>

          {/* ── Back to Home button ── */}
          {/*
            Uses React Router Link for internal navigation.
            Hover: scale up slightly + purple glow shadow (300ms transition).
            Ternary on inline style keeps the hover state via onMouseEnter/Leave.
          */}
          <BackHomeButton />
        </div>
      </div>
    </main>
  );
};

/* ── Extracted button component to cleanly manage its own hover state ── */
const BackHomeButton = () => {
  // useState: tracks hover to apply glow effect via ternary
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to="/"
      aria-label="Go back to home page"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        marginTop: "0.75rem",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem 1.75rem",
        borderRadius: "50px",
        fontWeight: 700,
        fontSize: "0.95rem",
        textDecoration: "none",
        color: "#fff",
        background: "var(--accent)",
        border: "2px solid transparent",
        // Ternary: apply glow box-shadow only when hovered
        boxShadow: hovered
          ? "0 0 0 4px rgba(129,140,248,0.25), 0 8px 24px rgba(129,140,248,0.35)"
          : "0 4px 14px rgba(129,140,248,0.2)",
        // Ternary: scale up slightly on hover
        transform: hovered ? "scale(1.06)" : "scale(1)",
        transition:
          "transform 300ms ease, box-shadow 300ms ease, background 300ms ease",
      }}
    >
      <ArrowLeft size={18} strokeWidth={2.5} />
      Back to Home
    </Link>
  );
};

export default NotFound;
