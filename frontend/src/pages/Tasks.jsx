import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks", { withCredentials: true }).then(res => {
      setTasks(res.data);
    });
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Task Report", 10, 10);
    const rows = tasks.map(t => [t.title, t.status, t.assignedTo, new Date(t.deadline).toLocaleDateString()]);
    doc.autoTable({ head: [["Title", "Status", "Assigned To", "Deadline"]], body: rows });
    doc.save("tasks.pdf");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <button onClick={downloadPDF} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
        Download PDF
      </button>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Assigned To</th>
            <th className="border px-4 py-2">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, i) => (
            <tr key={i}>
              <td className="border px-4 py-2">{t.title}</td>
              <td className="border px-4 py-2">{t.status}</td>
              <td className="border px-4 py-2">{t.assignedTo}</td>
              <td className="border px-4 py-2">{new Date(t.deadline).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
