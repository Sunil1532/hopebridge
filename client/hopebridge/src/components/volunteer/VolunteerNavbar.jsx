import React from "react";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function VolunteerNavbar() {
  const { user } = useUser();

  return (
    <div className="fixed top-0 left-64 right-0 bg-white shadow-md px-6 py-4 flex justify-between items-center z-20 border-b border-gray-200">
      <h1 className="text-xl font-semibold text-blue-700">Volunteer Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm md:text-base">
          👋 Hello, {user?.name || "Volunteer"}
        </span>

        <Link
          to="/"
          className="text-sm text-blue-600 border border-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200"
        >
          Home
        </Link>

        <Link
          to="/donate"
          className="text-sm text-green-600 border border-green-600 px-3 py-1.5 rounded-lg hover:bg-green-600 hover:text-white transition duration-200"
        >
          Donate
        </Link>
      </div>
    </div>
  );
}
