import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import ErrorPage from "./ErrorPage";

const FILTERS = ["All", "JavaScript", "TypeScript", "Python", "Other"];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Projects | My Portfolio";

    const fetchProjects = async () => {
      try {
        const response = await fetch("https://api.github.com/users/UtsavDevani90/repos", {
          headers: {
            Accept: "application/vnd.github+json",
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();

        const normalizedProjects = data
          .filter((repo) => !repo.fork)
          .map((repo) => ({
            id: repo.id,
            title: repo.name
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
            description: repo.description || "A project from my GitHub profile.",
            details: repo.homepage
              ? "This project includes a live demo and source code on GitHub."
              : "Source code is available on GitHub for this project.",
            tech: repo.language ? [repo.language] : ["GitHub"],
            github: repo.html_url,
            demo: repo.homepage || "",
            status: repo.private ? "Private" : "Public",
            category: repo.language || "Other",
          }));

        setProjects(normalizedProjects);
      } catch (err) {
        setError(err.message || "Unable to load projects right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((project) => project.category === activeFilter);

  return (
    <div className="page">
      <div className="container">
        <h2 className="section-title">My <span className="accent">Projects</span></h2>
        <p className="section-subtitle">Things I've built</p>

        <div className="filter-btns">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "filter-btn active" : "filter-btn"}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Loading projects from GitHub...</p>
          </div>
        ) : error ? (
          <ErrorPage message={error} />
        ) : (
          <div className="projects-grid">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
