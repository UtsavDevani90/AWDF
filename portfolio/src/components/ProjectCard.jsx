import { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

// Reusable ProjectCard — receives project data as props
const ProjectCard = ({ project }) => {
  // useState: toggle show/hide project details
  const [showDetails, setShowDetails] = useState(false);

  const { title, emoji, description, details, tech, github, demo, status } = project;

  return (
    <div className="project-card">
      {/* Placeholder image with emoji */}
      <div className="project-img-placeholder">{emoji}</div>

      <div className="project-body">
        <div className="project-header">
          <h3 className="project-title">{title}</h3>
          {/* Ternary: live vs in-progress status badge */}
          <span className={status === "Live" ? "project-status status-live" : "project-status status-progress"}>
            {status === "Live" ? "✅ Live" : "🚧 In Progress"}
          </span>
        </div>

        <p className="project-desc">{description}</p>

        {/* Conditional rendering: show details when toggled */}
        {showDetails && (
          <div className="project-details">
            <p>{details}</p>
          </div>
        )}

        {/* Toggle details button */}
        <button className="details-toggle" onClick={() => setShowDetails(!showDetails)}>
          {/* Ternary: show/hide label */}
          {showDetails ? <><FaChevronUp /> Hide Details</> : <><FaChevronDown /> Show Details</>}
        </button>

        {/* Tech stack tags */}
        <div className="tech-tags">
          {tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
        </div>

        {/* External anchor tags for GitHub and Live Demo */}
        <div className="project-links">
          <a href={github} target="_blank" rel="noopener noreferrer" className="link-github">
            <FaGithub /> GitHub
          </a>
          <a href={demo} target="_blank" rel="noopener noreferrer" className="link-demo">
            <FaExternalLinkAlt /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
