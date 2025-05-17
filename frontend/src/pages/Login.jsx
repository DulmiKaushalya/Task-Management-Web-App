import { useState } from "react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.open("http://localhost:5000/auth/google", "_self");
    }, 500);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-md">
        {/* Logo/Branding Area */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-2xl sm:text-3xl font-bold">
              Tick
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            TickTick
          </h1>
          <p className="text-gray-500 text-center mt-2 text-sm sm:text-base">
            Sign in to access your personal dashboard
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <GoogleIcon />
                <span>Sign in with Google</span>
              </>
            )}
          </button>

          <div className="text-center mt-2">
            <p className="text-sm text-gray-500">
              By signing in, you agree to our
              <a href="/terms" className="text-blue-600 hover:underline ml-1">
                Terms of Service
              </a>
              <span className="mx-1">and</span>
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Alternative Options */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Need help?{" "}
            <a href="/help" className="text-blue-600 hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// Simple loading spinner component
const LoadingSpinner = () => (
  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
);

// Google icon component
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
    />
  </svg>
);

export default Login;
