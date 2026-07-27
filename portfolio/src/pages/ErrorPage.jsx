const ErrorPage = ({ message = "Something went wrong while loading the projects." }) => (
  <div className="error-page">
    <h3>Unable to load projects</h3>
    <p>{message}</p>
    <p>Please try again in a moment.</p>
  </div>
);

export default ErrorPage;
