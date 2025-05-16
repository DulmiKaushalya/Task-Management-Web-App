import { useState } from "react";
import { FaSave, FaUndo } from "react-icons/fa";

const TaskForm = ({ initialData = {}, onSubmit, loading = false }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [deadline, setDeadline] = useState(
    initialData.deadline ? initialData.deadline.slice(0, 10) : ""
  );
  const [assignedTo, setAssignedTo] = useState(initialData.assignedTo || "");
  const [status, setStatus] = useState(initialData.status || "Pending");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!deadline) {
      errs.deadline = "Deadline is required";
    } else {
      const selectedDate = new Date(deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // remove time part for accurate comparison
      if (selectedDate < today) {
        errs.deadline = "Deadline cannot be in the past";
      }
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({ title, description, deadline, assignedTo, status });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDeadline("");
    setAssignedTo("");
    setStatus("Pending");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className={`w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
        {errors.title && (
          <p className="text-sm text-red-600 mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          className="w-full border p-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add some details..."
        />
      </div>

      {/* Deadline */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Deadline <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          className={`w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.deadline ? "border-red-500" : "border-gray-300"
          }`}
          value={deadline}
          min={new Date().toISOString().split("T")[0]} // today's date
          max={`${new Date().getFullYear()}-12-31`} // last date of current year
          onChange={(e) => setDeadline(e.target.value)}
        />

        {errors.deadline && (
          <p className="text-sm text-red-600 mt-1">{errors.deadline}</p>
        )}
      </div>

      {/* Assigned To */}
      <div>
        <label className="block text-sm font-medium mb-1">Assigned To</label>
        <input
          type="text"
          className="w-full border p-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder="Person responsible"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          className="w-full border p-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 disabled:bg-blue-400"
        >
          <FaSave />
          {loading ? "Saving..." : "Save Task"}
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-300"
        >
          <FaUndo />
          Reset
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
