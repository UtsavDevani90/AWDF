import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaDownload, FaHandshake, FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

// Roles cycled by the typing animation
const ROLES = [
  "Computer Engineering Student",
  "Frontend Developer",
  "React Enthusiast",
  "UI/UX Lover",
];

const Home = ({ theme }) => {
  const [typedText, setTypedText]   = useState("");
  const [roleIndex, setRoleIndex]   = useState(0);
  const [charIndex, setCharIndex]   = useState(0);
  const [deleting,  setDeleting]    = useState(false);

  // Set document title
  useEffect(() => { document.title = "Utsav Devani | Portfolio"; }, []);

  // Typing animation
  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed   = deleting ? 55 : 95;

    const timer = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setTypedText(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (deleting && charIndex > 0) {
        setTypedText(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!deleting && charIndex === current.length) {
        setTimeout(() => setDeleting(true), 1600);
      } else {
        setDeleting(false);
        setRoleIndex((roleIndex + 1) % ROLES.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, roleIndex]);

  return (
    <div className="page">
      <section className="hero">

        {/* ── Animated floating background blobs ── */}
        <span className="hero-blob hero-blob-1" aria-hidden="true" />
        <span className="hero-blob hero-blob-2" aria-hidden="true" />
        <span className="hero-blob hero-blob-3" aria-hidden="true" />

        <div className="hero-inner">

          {/* ── LEFT: text content ── */}
          <div className="hero-content hero-fade-in">
            <p className="hero-greeting">👋 Hello, I'm</p>

            <h1 className="hero-name">Utsav Devani</h1>

            {/* Typing animation row */}
            <p className="hero-typing">
              <span className="hero-typing-text">{typedText}</span>
              <span className="typing-cursor" />
            </p>

            <p className="hero-desc">
              I craft beautiful, performant web applications with modern
              technologies. Passionate about clean code and great user
              experiences that make a real difference.
            </p>

            {/* CTA buttons */}
            <div className="hero-btns">
              <a href="/resume.pdf" download className="btn btn-primary">
                <FaDownload /> Download CV
              </a>
              <Link to="/contact" className="btn btn-outline">
                <FaHandshake /> Hire Me
              </Link>
            </div>

            {/* Social icons */}
            <div className="hero-socials">
              <a href="https://github.com/utsavdevani"      target="_blank" rel="noopener noreferrer" aria-label="GitHub"    className="hero-social-icon"><FaGithub /></a>
              <a href="https://linkedin.com/in/utsavdevani" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"  className="hero-social-icon"><FaLinkedin /></a>
              <a href="https://instagram.com/utsavdevani"   target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hero-social-icon"><FaInstagram /></a>
              <a href="mailto:utsav@email.com"                                                         aria-label="Email"    className="hero-social-icon"><FaEnvelope /></a>
            </div>
          </div>

          {/* ── RIGHT: circular profile photo ── */}
          <div className="hero-photo-wrap hero-fade-in-delay">
            {/* Rotating dashed ring */}
            <span className="hero-ring" aria-hidden="true" />

            {/* Glow layer */}
            <span className="hero-glow" aria-hidden="true" />

            <img
              src="/profile.png"
              alt="Utsav Devani — profile photo"
              className="hero-photo"
              loading="eager"
            />

            {/* Floating badge — available for work */}
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              Available for work
            </span>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;
