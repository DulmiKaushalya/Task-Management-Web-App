const Task = require('../models/Task');

const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id }).sort({ deadline: 1 });
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title, description, deadline, assignedTo, status } = req.body;
  const task = new Task({ title, description, deadline, assignedTo, status, userId: req.user._id });
  await task.save();
  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndUpdate({ _id: id, userId: req.user._id }, req.body, { new: true });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
