import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

const ALL_PROJECTS = [
  {
    id: 1,
    title: "Import Export Website",
    emoji: "🚢",
    category: "Fullstack",
    description: "A full-featured B2B platform for managing import/export operations with real-time tracking.",
    details: "Built with React frontend, Node.js/Express backend, and PostgreSQL database. Features include user authentication, shipment tracking, invoice generation, and admin dashboard.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/username/import-export",
    demo: "https://import-export-demo.vercel.app",
    status: "Live",
  },
  {
    id: 2,
    title: "AI Study Assistant",
    emoji: "🤖",
    category: "AI",
    description: "An intelligent study companion powered by AI that helps students learn more effectively.",
    details: "Integrates OpenAI API for smart Q&A, generates quizzes from uploaded notes, tracks study progress, and provides personalized learning recommendations.",
    tech: ["React", "OpenAI API", "Node.js", "MongoDB", "CSS Modules"],
    github: "https://github.com/username/ai-study-assistant",
    demo: "https://ai-study-assistant.vercel.app",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Portfolio Website",
    emoji: "💼",
    category: "Frontend",
    description: "This very portfolio — a modern, responsive personal website built with React and Vite.",
    details: "Features dark/light mode, smooth animations, typing effect, scroll progress bar, project filtering, and full React Router navigation.",
    tech: ["React", "Vite", "React Router", "React Icons", "CSS"],
    github: "https://github.com/username/portfolio",
    demo: "https://myportfolio.vercel.app",
    status: "Live",
  },
];

const FILTERS = ["All", "Frontend", "Fullstack", "AI"];

const Projects = () => {
  // useState: active filter category
  const [activeFilter, setActiveFilter] = useState("All");

  // useEffect: set document title
  useEffect(() => {
    document.title = "Projects | My Portfolio";
  }, []);

  // Filter projects based on active category
  const filtered = activeFilter === "All"
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="page">
      <div className="container">
        <h2 className="section-title">My <span className="accent">Projects</span></h2>
        <p className="section-subtitle">Things I've built</p>

        {/* Filter Buttons */}
        <div className="filter-btns">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={activeFilter === f ? "filter-btn active" : "filter-btn"}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project Cards Grid — passing project data as props */}
        <div className="projects-grid">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
