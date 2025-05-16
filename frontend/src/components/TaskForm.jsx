import { useState, useEffect } from 'react';

const TaskForm = ({ initialData = {}, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [deadline, setDeadline] = useState(initialData.deadline ? initialData.deadline.slice(0,10) : '');
  const [assignedTo, setAssignedTo] = useState(initialData.assignedTo || '');
  const [status, setStatus] = useState(initialData.status || 'Pending');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!deadline) errs.deadline = 'Deadline is required';
    return errs;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({ title, description, deadline, assignedTo, status });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <div className="mb-4">
        <label className="block font-semibold mb-1">Title *</label>
        <input
          className={`w-full border p-2 rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
        />
        {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          className="w-full border p-2 rounded border-gray-300"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Deadline *</label>
        <input
          className={`w-full border p-2 rounded ${errors.deadline ? 'border-red-500' : 'border-gray-300'}`}
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          type="date"
        />
        {errors.deadline && <p className="text-red-600 text-sm">{errors.deadline}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Assigned To</label>
        <input
          className="w-full border p-2 rounded border-gray-300"
          value={assignedTo}
          onChange={e => setAssignedTo(e.target.value)}
          type="text"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Status</label>
        <select
          className="w-full border p-2 rounded border-gray-300"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
