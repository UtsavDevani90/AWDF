import { useEffect } from "react";
import { FaGraduationCap, FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const About = () => {
  // useEffect: set document title for About page
  useEffect(() => {
    document.title = "About | My Portfolio";
  }, []);

  return (
    <div className="page">
      <div className="container">
        <h2 className="section-title">About <span className="accent">Me</span></h2>
        <p className="section-subtitle">Get to know me better</p>

        <div className="about-grid">
          {/* Profile Image */}
          <div className="about-img-wrap">
            <img
              src="https://share.google/6GTrIU9befKJlsbbk"
              alt="About Me"
              className="about-img"
            />
          </div>

          {/* About Text */}
          <div className="about-text">
            <h2>Hi, I'm <span className="accent">utsav devani</span></h2>
            <p>
              I'm a passionate Full Stack Developer with a love for building modern,
              responsive web applications. I specialize in React, Node.js, and
              PostgreSQL, creating seamless user experiences from front to back.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open source, or enjoying a good cup of coffee ☕.
              I believe in writing clean, maintainable code that solves real problems.
            </p>
            <p>
              <FaMapMarkerAlt style={{ color: "var(--accent)" }} /> Based in Your City, Country
            </p>

            {/* Info Cards */}
            <div className="about-cards">
              <div className="about-card">
                <h4><FaGraduationCap /> Education</h4>
                <p><strong>B.Sc. Computer Science</strong></p>
                <p>Your University, 2020–2024</p>
              </div>
              <div className="about-card">
                <h4><FaBriefcase /> Experience</h4>
                <p><strong>2+ Years</strong></p>
                <p>Web Development</p>
              </div>
              <div className="about-card">
                <h4><FaCalendarAlt /> Availability</h4>
                <p><strong>Open to Work</strong></p>
                <p>Full-time / Freelance</p>
              </div>
              <div className="about-card">
                <h4>🚀 Projects</h4>
                <p><strong>10+ Completed</strong></p>
                <p>Personal & Client Work</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
