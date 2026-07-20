import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      {/* Brand */}
      <div className="footer-brand">
        <h3>&lt;Portfolio /&gt;</h3>
        <p>Building modern web experiences with passion and precision.</p>
      </div>

      {/* Quick Links — using Link for internal navigation */}
      <div className="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      {/* Social — using <a> anchor tags for external links */}
      <div className="footer-social">
        <h4>Connect</h4>
        <div className="footer-social-icons">
          <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com/username" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="mailto:your@email.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} utsav devani. Built with React & ❤️</p>
    </div>
  </footer>
);

export default Footer;
