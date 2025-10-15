const Error = ({ message }) => (
  <div className="card text-red-600 p-4 text-center">
    <p>{message || 'An error occurred. Please try again.'}</p>
  </div>
);

export default Error;