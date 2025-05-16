import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import ViewTask from './pages/ViewTask';
import Reports from './pages/Reports';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
        <Route path="/view-task/:id" element={<ViewTask />} />
        <Route path="/reports" element={<Reports />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
