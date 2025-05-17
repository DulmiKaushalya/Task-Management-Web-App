import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaCamera } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current user data
    setLoading(true);
    axios
      .get("http://localhost:5000/auth/current-user", { withCredentials: true })
      .then((res) => {
        if (!res.data) {
          navigate("/");
          return;
        }
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Failed to load profile data. Please try again later.");
        setLoading(false);
        // Don't redirect immediately so we can show the error
        setTimeout(() => navigate("/"), 3000);
      });
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to get user initials for avatar placeholder
  const getUserInitials = () => {
    if (!user || !user.name) return "?";
    return user.name
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header user={null} toggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
          {isSidebarOpen && <Sidebar />}
          <main
            className={`flex-1 p-6 transition-all duration-300 ${
              isSidebarOpen ? "ml-0" : "ml-0"
            }`}
          >
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header user={null} toggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
          {isSidebarOpen && <Sidebar />}
          <main
            className={`flex-1 p-6 transition-all duration-300 ${
              isSidebarOpen ? "ml-0" : "ml-0"
            }`}
          >
            <div className="flex justify-center items-center h-full">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>{error}</p>
                <p className="text-sm">Redirecting to login page...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header user={user} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {isSidebarOpen && <Sidebar />}

        <main
          className={`flex-1 p-6 transition-all duration-300 ${
            isSidebarOpen ? "ml-0" : "ml-0"
          }`}
        >
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-600">
              View and manage your account information
            </p>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Profile Header with Avatar */}
            <div className="bg-blue-600 h-32 relative">
              <div className="absolute -bottom-16 left-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold border-4 border-white">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      getUserInitials()
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
                    <FaCamera className="text-gray-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="pt-20 px-6 pb-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Personal Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Full Name
                      </label>
                      <div className="mt-1 text-gray-900">
                        {user?.name || "No name provided"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Email Address
                      </label>
                      <div className="mt-1 text-gray-900">
                        {user?.email || "No email provided"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Account Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        User ID
                      </label>
                      <div className="mt-1 text-gray-900">
                        {user?._id || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
            >
              <FaArrowLeft /> Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
