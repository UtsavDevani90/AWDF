import { useState } from "react";

const ProjectCard = ({ project }) => {
  const [showDetails, setShowDetails] = useState(false);

  const { title, description, details, tech, github, demo, status } = project;

  const initials = title
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <div className="project-card">
      <div className="project-img-placeholder">
        <span className="project-initials">{initials}</span>
      </div>

      <div className="project-body">
        <div className="project-header">
          <h3 className="project-title">{title}</h3>
          <span className={status === "Public" ? "project-status status-live" : "project-status status-progress"}>
            {status === "Public" ? "Public" : "Private"}
          </span>
        </div>

        <p className="project-desc">{description}</p>

        {showDetails && (
          <div className="project-details">
            <p>{details}</p>
          </div>
        )}

        <button className="details-toggle" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide Details" : "Show Details"}
        </button>

        <div className="tech-tags">
          {tech.map((item) => (
            <span key={item} className="tech-tag">{item}</span>
          ))}
        </div>

        <div className="project-links">
          <a href={github} target="_blank" rel="noopener noreferrer" className="link-github">
            GitHub
          </a>
          {demo ? (
            <a href={demo} target="_blank" rel="noopener noreferrer" className="link-demo">
              Live Demo
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
