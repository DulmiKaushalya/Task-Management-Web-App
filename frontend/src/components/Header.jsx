import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, User, LogOut } from 'lucide-react';

const Header = ({ user, toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Logo and menu toggle */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-blue-600 font-bold text-2xl">TaskMaster</span>
          </div>
        </div>

        {/* Center - Search bar */}
        <div className="hidden md:flex items-center max-w-md w-full relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for tasks..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Right side - Notifications and user profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none relative"
            >
              <Bell size={24} />
              
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10">
                <h3 className="px-4 py-2 font-semibold text-gray-700 border-b">Notifications</h3>
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 border-b">
                    <p className="font-medium text-gray-800">Task deadline approaching</p>
                    <p className="text-sm text-gray-600">Project proposal due in 2 days</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 border-b">
                    <p className="font-medium text-gray-800">New task assigned</p>
                    <p className="text-sm text-gray-600">Team review for Q2 planning</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="font-medium text-gray-800">Task completed</p>
                    <p className="text-sm text-gray-600">Weekly report has been submitted</p>
                  </div>
                </div>
                <div className="px-4 py-2 border-t">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User profile dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                {user?.name ? user.name.charAt(0).toUpperCase() : <User size={20} />}
              </div>
              <span className="hidden md:inline-block font-medium text-gray-700">
                {user?.name || 'User'}
              </span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                <button 
                  onClick={() => navigate('/profile')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile Settings
                </button>
                <button 
                  onClick={() => navigate('/preferences')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Preferences
                </button>
                <hr className="my-1" />
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;