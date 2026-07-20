import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  // useEffect: set document title for 404 page
  useEffect(() => {
    document.title = "404 | Page Not Found";
  }, []);

  return (
    <div className="page">
      <div className="not-found">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-accent">
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
