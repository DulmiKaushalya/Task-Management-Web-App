import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks', { withCredentials: true })
      .then(res => {
        const found = res.data.find(t => t._id === id);
        if (!found) {
          alert('Task not found');
          navigate('/tasks');
        } else {
          setTask(found);
        }
      });
  }, [id]);

  if (!task) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
      <p><strong>Description:</strong> {task.description || 'No description'}</p>
      <p><strong>Assigned To:</strong> {task.assignedTo || 'Not assigned'}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
      <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}</p>
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => navigate('/tasks')}
      >
        Back to Tasks
      </button>
    </div>
  );
};

export default ViewTask;
