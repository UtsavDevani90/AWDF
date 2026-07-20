import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Skills from "../pages/Skills";
import Projects from "../pages/Projects";
import Resume from "../pages/Resume";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

// AppRoutes — centralised route definitions for the portfolio app
const AppRoutes = ({ theme }) => (
  <Routes>
    <Route path="/"        element={<Home theme={theme} />} />
    <Route path="/about"   element={<About />} />
    <Route path="/skills"  element={<Skills />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/resume"  element={<Resume />} />
    <Route path="/contact" element={<Contact />} />
    {/* Catch-all — renders 404 for any unknown path */}
    <Route path="*"        element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
