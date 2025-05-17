// src/pages/Preferences.jsx
import { useState } from "react";

const Preferences = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Preferences</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="form-checkbox"
          />
          <span>Enable Dark Mode</span>
        </label>
        {/* Add more preferences as needed */}
      </div>
    </div>
  );
};

export default Preferences;
