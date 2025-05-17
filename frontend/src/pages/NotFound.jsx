import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  // Determine if this is an unauthorized access or a 404
  useEffect(() => {
    // Check if we were redirected with state indicating unauthorized access
    if (location.state && location.state.unauthorized) {
      setIsUnauthorized(true);
    }
  }, [location]);

  // Countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Redirect to login page when countdown finishes
      navigate("/");
    }
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto w-24 h-24 flex items-center justify-center mb-6">
          {isUnauthorized ? (
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg
                className="w-16 h-16 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m0 0v2m0-2h2m-2 0H8m4-6v4m0-11l-7 7h14l-7-7z"
                ></path>
              </svg>
            </div>
          ) : (
            <div className="bg-red-100 p-3 rounded-full">
              <svg
                className="w-16 h-16 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {isUnauthorized ? "Access Denied" : "Page Not Found"}
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          {isUnauthorized
            ? "You need to be logged in to access this page."
            : "The page you are looking for doesnt exist or has been moved."}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Countdown */}
        <div className="mb-6">
          <p className="text-gray-500">
            Redirecting to login page in{" "}
            <span className="font-bold text-blue-600">{countdown}</span>{" "}
            seconds...
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow transition-colors duration-300"
          >
            Login Now
          </button>

          <button
            onClick={() => window.history.back()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-md shadow transition-colors duration-300"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Footer with brand */}
      <div className="mt-8">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
            <span className="text-white text-xs font-bold">T</span>
          </div>
          <span className="text-gray-600">TickTick</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
