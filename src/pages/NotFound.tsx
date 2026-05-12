import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-blue">404</h1>

        <p className="mt-4 text-lg text-darkBlue">
          Oops! The page you're looking for doesn't exist.
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-purple text-white rounded-lg shadow hover:bg-darkPurple transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
