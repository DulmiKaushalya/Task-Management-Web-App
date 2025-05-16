import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [taskStats, setTaskStats] = useState({});
  const [recentTasks, setRecentTasks] = useState([]);
  const [timeOfDay, setTimeOfDay] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current user data
    axios.get("http://localhost:5000/auth/current-user", { withCredentials: true })
      .then(res => {
        if (!res.data) return navigate('/');
        setUser(res.data);
      })
      .catch(err => {
        console.error("Error fetching user data:", err);
        navigate('/');
      });

    // Get tasks data
    axios.get("http://localhost:5000/tasks", { withCredentials: true })
      .then(res => {
        const stats = {
          total: res.data.length,
          pending: res.data.filter(t => t.status === 'Pending').length,
          done: res.data.filter(t => t.status === 'Done').length,
          inProgress: res.data.filter(t => t.status === 'In Progress').length
        };
        setTaskStats(stats);
        
        // Get 5 most recent tasks
        const sorted = [...res.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentTasks(sorted.slice(0, 5));
      })
      .catch(err => {
        console.error("Error fetching tasks:", err);
      });

    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Morning');
    else if (hour < 18) setTimeOfDay('Afternoon');
    else setTimeOfDay('Evening');
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Prepare chart data
  const chartData = [
    { name: 'Tasks', Completed: taskStats.done, Pending: taskStats.pending, InProgress: taskStats.inProgress }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header user={user} toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        {isSidebarOpen && <Sidebar />}
        
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Good {timeOfDay}, {user?.name}</h1>
            <p className="text-gray-600">Here's what's happening with your tasks today.</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <Calendar size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Total Tasks</h3>
                <p className="text-2xl font-bold">{taskStats.total || 0}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-yellow-100 p-3 mr-4">
                <Clock size={24} className="text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
                <p className="text-2xl font-bold">{taskStats.pending || 0}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <AlertCircle size={24} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">In Progress</h3>
                <p className="text-2xl font-bold">{taskStats.inProgress || 0}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Completed</h3>
                <p className="text-2xl font-bold">{taskStats.done || 0}</p>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Task Overview</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Completed" fill="#10B981" />
                    <Bar dataKey="Pending" fill="#F59E0B" />
                    <Bar dataKey="InProgress" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Recent Tasks */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Tasks</h3>
              
              {recentTasks.length > 0 ? (
                <div className="space-y-4">
                  {recentTasks.map((task, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div 
                        className={`w-3 h-3 rounded-full mr-3
                          ${task.status === 'Done' ? 'bg-green-500' : 
                            task.status === 'In Progress' ? 'bg-purple-500' : 'bg-yellow-500'}`}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{task.title}</h4>
                        <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                      </div>
                      <span 
                        className={`text-xs px-2 py-1 rounded font-medium
                          ${task.status === 'Done' ? 'bg-green-100 text-green-800' : 
                            task.status === 'In Progress' ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800'}`}
                      >
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500">No recent tasks found</p>
              )}
              
              <button 
                onClick={() => navigate('/tasks')} 
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                View All Tasks
              </button>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              onClick={() => navigate('/add-task')} 
              className="bg-white hover:bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center justify-center transition-colors"
            >
              <div className="text-blue-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Create New Task</h3>
            </button>
            
            <button 
              onClick={() => navigate('/calendar')} 
              className="bg-white hover:bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center justify-center transition-colors"
            >
              <div className="text-purple-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">View Calendar</h3>
            </button>
            
            <button 
              onClick={() => navigate('/reports')} 
              className="bg-white hover:bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center justify-center transition-colors"
            >
              <div className="text-green-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Reports & Analytics</h3>
            </button>
          </div>
        </main>
      </div>

    </div>
  );
};

export default Dashboard;