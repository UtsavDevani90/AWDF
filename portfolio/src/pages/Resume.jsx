import { useEffect } from "react";
import { FaDownload, FaGraduationCap, FaBriefcase } from "react-icons/fa";

const EDUCATION = [
  {
    degree: "B.Sc. Computer Science",
    org: "Your University",
    period: "2020 – 2024",
    desc: "Focused on software engineering, data structures, algorithms, and web development. Graduated with honors.",
  },
  {
    degree: "Higher Secondary Certificate",
    org: "Your College",
    period: "2018 – 2020",
    desc: "Science group with Computer Science. Achieved excellent results in mathematics and physics.",
  },
];

const EXPERIENCE = [
  {
    role: "Junior Frontend Developer",
    org: "Tech Company Ltd.",
    period: "Jan 2024 – Present",
    desc: "Building responsive React applications, collaborating with design teams, and optimizing web performance.",
  },
  {
    role: "Web Development Intern",
    org: "Startup XYZ",
    period: "Jun 2023 – Dec 2023",
    desc: "Developed and maintained client websites using HTML, CSS, JavaScript, and React. Worked in an Agile team.",
  },
];

const Resume = () => {
  // useEffect: set document title
  useEffect(() => {
    document.title = "Resume | My Portfolio";
  }, []);

  return (
    <div className="page">
      <div className="container">
        <h2 className="section-title">My <span className="accent">Resume</span></h2>
        <p className="section-subtitle">Education & Experience</p>

        {/* Download Resume — external anchor tag */}
        <div className="resume-download">
          <a
            href="/resume.pdf"
            download
            className="btn btn-accent"
            style={{ display: "inline-flex" }}
          >
            <FaDownload /> Download Full Resume (PDF)
          </a>
        </div>

        <div className="resume-sections">
          {/* Education Timeline */}
          <div className="resume-section">
            <h3><FaGraduationCap /> Education</h3>
            <div className="timeline">
              {EDUCATION.map((item) => (
                <div className="timeline-item" key={item.degree}>
                  <h4>{item.degree}</h4>
                  <p className="org">{item.org}</p>
                  <p className="period">📅 {item.period}</p>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="resume-section">
            <h3><FaBriefcase /> Experience</h3>
            <div className="timeline">
              {EXPERIENCE.map((item) => (
                <div className="timeline-item" key={item.role}>
                  <h4>{item.role}</h4>
                  <p className="org">{item.org}</p>
                  <p className="period">📅 {item.period}</p>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
