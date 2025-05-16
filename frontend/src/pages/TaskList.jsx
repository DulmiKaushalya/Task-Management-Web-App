import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaDownload, FaArrowLeft } from 'react-icons/fa';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';


const TaskList = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState([]);
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

    fetchTasks();
  }, [navigate]);

  const fetchTasks = () => {
    axios.get("http://localhost:5000/tasks", { withCredentials: true })
      .then(res => setTasks(res.data))
      .catch(err => console.error("Error fetching tasks:", err));
  };

const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Task Report", 14, 20);

  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

  // ✅ Correct usage now
  autoTable(doc, {
  head: [["#", "Title", "Status", "Deadline"]],
  body: tasks.map((task, index) => [
    index + 1,
    task.title,
    task.status,
    new Date(task.deadline).toLocaleDateString()
  ]),
  startY: 35,
  styles: { fontSize: 10 },
  headStyles: { fillColor: [52, 152, 219] },
});


  doc.save("task_report.pdf");
};



  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      axios.delete(`http://localhost:5000/tasks/${id}`, { withCredentials: true })
        .then(() => fetchTasks());
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-200 text-blue-800';
      case 'Done':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header user={user} toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        {isSidebarOpen && <Sidebar />}
        
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Task List</h1>
              <p className="text-gray-600">Manage and organize your tasks</p>
            </div>

             <button
              onClick={() => navigate('/add-task')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded shadow"
            >
              <FaArrowLeft /> ADD NEW TASK
            </button>
            
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
            >
              <FaDownload /> Download PDF
            </button>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Deadline</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-6 text-gray-500">No tasks available</td>
                  </tr>
                ) : (
                  tasks.map((task, index) => (
                    <tr key={task._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3">{task.title}</td>
                      <td className="p-3 truncate max-w-xs" title={task.description}>
                        {task.description || '—'}
                      </td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="p-3">{new Date(task.deadline).toLocaleDateString()}</td>
                      <td className="p-3 text-center space-x-2">
                        <button
                          onClick={() => navigate(`/edit-task/${task._id}`)}
                          className="text-yellow-600 hover:text-yellow-800"
                          title="Edit Task"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete Task"
                        >
                          <FaTrash />
                        </button>
                        <button
                          onClick={() => navigate(`/view-task/${task._id}`)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View Task"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate('/dashboard')}
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

export default TaskList;