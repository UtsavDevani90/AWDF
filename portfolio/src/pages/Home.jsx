import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaDownload, FaHandshake } from "react-icons/fa";

// Typing animation words
const ROLES = ["Full Stack Developer", "React Specialist", "UI/UX Enthusiast", "Problem Solver"];

const Home = ({ theme }) => {
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // useEffect: update document title for this page
  useEffect(() => {
    document.title = "Home | My Portfolio";
  }, []);

  // useEffect: typing animation logic
  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = deleting ? 60 : 100;

    const timer = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setTypedText(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (deleting && charIndex > 0) {
        setTypedText(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!deleting && charIndex === current.length) {
        setTimeout(() => setDeleting(true), 1500);
      } else {
        setDeleting(false);
        setRoleIndex((roleIndex + 1) % ROLES.length);
      }
    }, speed);

    // Cleanup: remove timer on unmount
    return () => clearTimeout(timer);
  }, [charIndex, deleting, roleIndex]);

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          {/* Avatar — border color changes with theme using ternary */}
          <img
            src="https://share.google/6GTrIU9befKJlsbbk"
            alt="Profile"
            className="hero-avatar"
            style={{ borderColor: theme === "light" ? "#6c63ff" : "#818cf8" }}
          />
          <p className="hero-greeting">👋 Hello, I'm</p>
          <h1 className="hero-name">utsav devani</h1>

          {/* Typing animation */}
          <p className="hero-typing">
            {typedText}<span className="typing-cursor" />
          </p>

          <p className="hero-desc">
            I craft beautiful, performant web applications with modern technologies.
            Passionate about clean code and great user experiences.
          </p>

          <div className="hero-btns">
            {/* Internal Link for navigation */}
            <Link to="/projects" className="btn btn-primary">
              View Projects
            </Link>
            {/* External anchor tag for resume download */}
            <a
              href="/resume.pdf"
              download
              className="btn btn-outline"
            >
              <FaDownload /> Download CV
            </a>
            <Link to="/contact" className="btn btn-outline">
              <FaHandshake /> Hire Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
