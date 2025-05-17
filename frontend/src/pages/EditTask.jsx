import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TaskForm from "../components/TaskForm";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks", { withCredentials: true })
      .then((res) => {
        const found = res.data.find((t) => t._id === id);
        if (!found) {
          alert("Task not found");
          navigate("/tasks");
        } else {
          setTask(found);
        }
      });
  }, [id]);

  const handleUpdateTask = async (taskData) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, taskData, {
        withCredentials: true,
      });
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!task) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">Edit Task</h2>
        <TaskForm initialData={task} onSubmit={handleUpdateTask} />
      </div>
    </div>
  );
};

export default EditTask;
