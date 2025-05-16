import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskForm from '../components/TaskForm';

const AddTask = () => {
  const navigate = useNavigate();

  const handleAddTask = async (taskData) => {
    try {
      await axios.post('http://localhost:5000/tasks', taskData, { withCredentials: true });
      navigate('/tasks');
    } catch (error) {
      alert('Failed to add task');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      <TaskForm onSubmit={handleAddTask} />
    </div>
  );
};

export default AddTask;
