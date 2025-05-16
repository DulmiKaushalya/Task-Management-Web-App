import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = () => {
    axios.get("http://localhost:5000/tasks", { withCredentials: true })
      .then(res => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Task Report", 10, 10);
    tasks.forEach((task, i) => {
      doc.text(`${i + 1}. ${task.title} - ${task.status}`, 10, 20 + i * 10);
    });
    doc.save("task_report.pdf");
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:5000/tasks/${id}`, { withCredentials: true })
      .then(() => fetchTasks());
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Task List</h2>
      <button onClick={downloadPDF} className="bg-green-600 text-white px-4 py-2 rounded mb-4">
        Download PDF
      </button>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="p-2">Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td className="p-2">{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{new Date(task.deadline).toLocaleDateString()}</td>
              <td className="space-x-2">
                <button onClick={() => navigate(`/edit-task/${task._id}`)} className="bg-yellow-500 px-2 text-white rounded">Edit</button>
                <button onClick={() => handleDelete(task._id)} className="bg-red-500 px-2 text-white rounded">Delete</button>
                <button onClick={() => navigate(`/view-task/${task._id}`)} className="bg-blue-500 px-2 text-white rounded">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/add-task')} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
        Add Task
      </button>
    </div>
  );
};

export default TaskList;
