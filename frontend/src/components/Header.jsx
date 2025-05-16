import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, User, LogOut } from 'lucide-react';

const Header = ({ user, toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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
            <span className="text-blue-600 font-bold text-2xl">TickTick</span> 
          </div>
        </div>
        {/* Right side -user profile */}
        <div className="flex items-center space-x-4">
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