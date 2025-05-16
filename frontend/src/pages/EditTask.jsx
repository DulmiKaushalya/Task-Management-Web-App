import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskForm from '../components/TaskForm';

const EditTask = () => {
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

  const handleUpdateTask = async (taskData) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, taskData, { withCredentials: true });
      navigate('/tasks');
    } catch (error) {
      alert('Failed to update task');
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>
      <TaskForm initialData={task} onSubmit={handleUpdateTask} />
    </div>
  );
};

export default EditTask;
