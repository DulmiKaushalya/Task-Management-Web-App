import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  CheckSquare, 
  Calendar, 
  BarChart2, 
  Users, 
  Settings,
  HelpCircle
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { 
      title: 'Dashboard', 
      icon: <Home size={20} />, 
      path: '/dashboard',
      badge: null
    },
    { 
      title: 'Tasks', 
      icon: <CheckSquare size={20} />, 
      path: '/tasks',
    },
    { 
      title: 'Calendar', 
      icon: <Calendar size={20} />, 
      path: '/calendar',
      badge: null
    },
    { 
      title: 'Reports', 
      icon: <BarChart2 size={20} />, 
      path: '/reports',
      badge: null
    },
  ];

  const bottomMenuItems = [
    { 
      title: 'Settings', 
      icon: <Settings size={20} />, 
      path: '/settings'
    },
    { 
      title: 'Help', 
      icon: <HelpCircle size={20} />, 
      path: '/help'
    }
  ];
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="bg-white w-64 min-h-screen shadow-md flex-col">
      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="px-4 space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <span className={isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}>
                  {item.icon}
                </span>
                <span className="ml-3 font-medium">{item.title}</span>
              </div>
              
              {item.badge && (
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  item.badge === 'New' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Bottom section */}
      <div className="p-4 border-t">
        <nav className="space-y-1">
          {bottomMenuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className={isActive(item.path) ? 'text-blue-600' : 'text-gray-500'}>
                {item.icon}
              </span>
              <span className="ml-3 font-medium">{item.title}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;