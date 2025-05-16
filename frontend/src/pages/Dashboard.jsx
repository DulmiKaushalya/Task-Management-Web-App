import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Welcome to Task Manager</h1>
      <div className="mt-4">
        <Link to="/tasks" className="text-blue-500 underline">Go to Tasks</Link>
      </div>
    </div>
  );
}
