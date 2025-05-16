import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import { useState } from 'react';

const AddTask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddTask = async (taskData) => {
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/tasks', taskData, { withCredentials: true });
      navigate('/tasks');
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">📝 Add New Task</h2>
        <TaskForm onSubmit={handleAddTask} loading={loading} />
      </div>
    </div>
  );
};

export default AddTask;
