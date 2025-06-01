import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPlusCircle, FaDonate, FaSignOutAlt } from "react-icons/fa";

export default function VolunteerSidebar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "bg-blue-500 text-white" : "hover:bg-blue-300";

  return (
    <div className="h-screen w-64 bg-blue-200 text-blue-900 fixed top-0 left-0 shadow-lg flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold p-6 border-b border-blue-300">
          HopeBridge
        </div>
        <nav className="p-4 space-y-4">
          <Link
            to="/volunteer/add-child"
            className={`flex items-center gap-3 p-2 rounded ${isActive("/volunteer/add-child")}`}
          >
            <FaPlusCircle /> Add Child
          </Link>
          <Link
            to="/volunteer/donate"
            className={`flex items-center gap-3 p-2 rounded ${isActive("/volunteer/donate")}`}
          >
            <FaDonate /> Donate
          </Link>
        </nav>
      </div>
      
      <div className="p-4 border-t border-blue-300">
        <Link
          to="/"
          className="flex items-center gap-3 p-2 rounded hover:bg-red-400 text-red-700"
        >
          <FaSignOutAlt /> Logout
        </Link>
      </div>
    </div>
  );
}
