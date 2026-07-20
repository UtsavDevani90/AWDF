import { useEffect, useState } from "react";

const SKILLS = [
  { name: "HTML5", icon: "🌐", pct: 95, color: "#e34f26" },
  { name: "CSS3", icon: "🎨", pct: 90, color: "#1572b6" },
  { name: "JavaScript", icon: "⚡", pct: 88, color: "#f7df1e" },
  { name: "React", icon: "⚛️", pct: 85, color: "#61dafb" },
  { name: "Node.js", icon: "🟢", pct: 80, color: "#339933" },
  { name: "Express", icon: "🚂", pct: 78, color: "#000000" },
  { name: "PostgreSQL", icon: "🐘", pct: 72, color: "#336791" },
  { name: "Git", icon: "🔀", pct: 88, color: "#f05032" },
  { name: "Tailwind CSS", icon: "💨", pct: 82, color: "#06b6d4" },
];

const Skills = () => {
  // useState: control animated bar widths (start at 0 for animation)
  const [animated, setAnimated] = useState(false);

  // useEffect: set title and trigger bar animation after mount
  useEffect(() => {
    document.title = "Skills | My Portfolio";
    // Small delay so CSS transition plays visibly
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    <div className="page">
      <div className="container">
        <h2 className="section-title">My <span className="accent">Skills</span></h2>
        <p className="section-subtitle">Technologies I work with</p>

        <div className="skills-grid">
          {SKILLS.map(({ name, icon, pct }) => (
            <div className="skill-card" key={name}>
              <div className="skill-icon">{icon}</div>
              <div className="skill-name">{name}</div>
              <div className="skill-bar-bg">
                {/* Animated bar: width transitions from 0 to pct% */}
                <div
                  className="skill-bar"
                  style={{ width: animated ? `${pct}%` : "0%" }}
                />
              </div>
              <div className="skill-pct">{pct}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
