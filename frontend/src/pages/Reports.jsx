import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { 
  PieChart, 
  Pie, 
  Cell,
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle, 
  AlertCircle,
} from 'lucide-react';

const Reports = () => {
  const [user, setUser] = useState(null);
  const [taskStats, setTaskStats] = useState({});
  const [dateRange] = useState('weekly'); // weekly, monthly, yearly
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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

    fetchTaskData();
  }, [navigate, dateRange]);

  const fetchTaskData = () => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching tasks:", err);
        setIsLoading(false);
      });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Mock data - in a real app, this would come from the API based on dateRange
  const tasksByStatusData = [
    { name: 'Done', value: taskStats.done || 0 },
    { name: 'In Progress', value: taskStats.inProgress || 0 },
    { name: 'Pending', value: taskStats.pending || 0 }
  ];

  const COLORS = ['#10B981', '#8B5CF6', '#F59E0B'];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header user={user} toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        {isSidebarOpen && <Sidebar />}
        
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
              <p className="text-gray-600">View insights and performance metrics for your tasks</p>
            </div>
            
          </div>      
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <CalendarIcon size={24} className="text-blue-600" />
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
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Tasks by Status Pie Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Tasks by Status</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tasksByStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {tasksByStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;