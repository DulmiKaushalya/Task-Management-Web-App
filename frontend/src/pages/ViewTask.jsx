import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaUser, FaClock, FaClipboardList } from "react-icons/fa";

const ViewTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load task");
        navigate("/tasks");
        setLoading(false);
      });
  }, [id]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <FaClipboardList className="text-blue-600" /> Task Details
        </h2>

        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="text-lg font-semibold">{task.title}</p>
          <p className="text-gray-700 mt-1">
            {task.description || "No description provided."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border rounded bg-white shadow-sm">
            <p className="font-semibold flex items-center gap-2">
              <FaUser /> Assigned To:
            </p>
            <p className="text-gray-700">{task.assignedTo || "Not assigned"}</p>
          </div>
          <div className="p-4 border rounded bg-white shadow-sm">
            <p className="font-semibold flex items-center gap-2">
              <FaClock /> Deadline:
            </p>
            <p className="text-gray-700">
              {new Date(task.deadline).toLocaleDateString()}
            </p>
          </div>
          <div className="p-4 border rounded bg-white shadow-sm">
            <p className="font-semibold">Status:</p>
            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                task.status
              )}`}
            >
              {task.status}
            </span>
          </div>
          <div className="p-4 border rounded bg-white shadow-sm">
            <p className="font-semibold">Created At:</p>
            <p className="text-gray-700">
              {new Date(task.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="p-4 border rounded bg-white shadow-sm">
            <p className="font-semibold">Last Updated:</p>
            <p className="text-gray-700">
              {new Date(task.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={() => navigate("/tasks")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow transition duration-200"
          >
            <FaArrowLeft /> Back to Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
