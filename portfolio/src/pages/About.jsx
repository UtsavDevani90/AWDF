import { useEffect } from "react";
import { FaGraduationCap, FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCode, FaHeart } from "react-icons/fa";

// Stats shown below the intro text
const STATS = [
  { value: "10+", label: "Projects" },
  { value: "9+",  label: "Skills" },
  { value: "1+",  label: "Years Exp." },
  { value: "3+",  label: "Certifications" },
];

const About = () => {
  useEffect(() => { document.title = "About | Utsav Devani"; }, []);

  return (
    <div className="page">
      <div className="container">
        <h2 className="section-title">About <span className="accent">Me</span></h2>
        <p className="section-subtitle">Get to know me better</p>

        <div className="about-grid">

          {/* ── Profile image column ── */}
          <div className="about-img-wrap">
            {/* Glow ring behind the image */}
            <div className="about-img-glow" />
            <img
              src="/profile.png"
              alt="Utsav Devani"
              className="about-img"
              loading="lazy"
            />
          </div>

          {/* ── Text + cards column ── */}
          <div className="about-text">
            <h2>Hi, I'm <span className="accent">Utsav Devani</span></h2>

            <p>
              I'm a passionate Computer Engineering student and Frontend Developer
              with a love for building modern, responsive web applications. I
              specialise in React, Node.js, and crafting seamless user experiences
              from front to back.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open source, or enjoying a good cup of coffee ☕.
              I believe in writing clean, maintainable code that solves real problems.
            </p>

            {/* Quick-info row */}
            <div className="about-info-row">
              <span><FaMapMarkerAlt className="about-info-icon" /> Gujarat, India</span>
              <span><FaCode         className="about-info-icon" /> React · Node.js · JS</span>
              <span><FaHeart        className="about-info-icon" /> Open Source</span>
            </div>

            {/* Info cards */}
            <div className="about-cards">
              <div className="about-card">
                <h4><FaGraduationCap /> Education</h4>
                <p><strong>B.E. Computer Engineering</strong></p>
                <p>Gujarat University, 2022 – 2026</p>
              </div>
              <div className="about-card">
                <h4><FaBriefcase /> Experience</h4>
                <p><strong>1+ Year</strong></p>
                <p>Frontend / React Development</p>
              </div>
              <div className="about-card">
                <h4><FaCalendarAlt /> Availability</h4>
                <p><strong>Open to Work</strong></p>
                <p>Internship / Freelance</p>
              </div>
              <div className="about-card">
                <h4>🌐 Languages</h4>
                <p><strong>English, Hindi</strong></p>
                <p>Gujarati (Native)</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="about-stats">
          {STATS.map(({ value, label }) => (
            <div className="about-stat-card" key={label}>
              <span className="about-stat-value">{value}</span>
              <span className="about-stat-label">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;
