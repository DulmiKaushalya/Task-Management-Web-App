import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [taskStats, setTaskStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/auth/current-user", { withCredentials: true })
      .then(res => {
        if (!res.data) return navigate('/');
        setUser(res.data);
      });

    axios.get("http://localhost:5000/tasks", { withCredentials: true })
      .then(res => {
        const stats = {
          total: res.data.length,
          pending: res.data.filter(t => t.status === 'Pending').length,
          done: res.data.filter(t => t.status === 'Done').length
        };
        setTaskStats(stats);
      });
  }, []);

  const handleLogout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded text-white">
          Logout
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white shadow p-4 rounded">Total Tasks: {taskStats.total}</div>
        <div className="bg-white shadow p-4 rounded">Pending: {taskStats.pending}</div>
        <div className="bg-white shadow p-4 rounded">Completed: {taskStats.done}</div>
      </div>
      <button onClick={() => navigate('/tasks')} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded">
        Manage Tasks
      </button>
    </div>
  );
};

export default Dashboard;
