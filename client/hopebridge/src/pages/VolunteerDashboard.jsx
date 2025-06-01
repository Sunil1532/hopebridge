import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import VolunteerSidebar from "../components/volunteer/VolunteerSidebar";
import VolunteerNavbar from "../components/volunteer/VolunteerNavbar";
import { UserContext } from "../context/UserContext";

export default function VolunteerDashboard() {
  const { user } = useContext(UserContext);
  const [children, setChildren] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const childrenPerPage = 5;

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/volunteer/children");
        setChildren(res.data);
      } catch (err) {
        console.error("Error fetching children:", err);
      }
    };

    fetchChildren();
  }, []);

  const filteredChildren = children.filter((child) =>
    child.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * childrenPerPage;
  const indexOfFirst = indexOfLast - childrenPerPage;
  const currentChildren = filteredChildren.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredChildren.length / childrenPerPage);

  return (
    <div className="flex">
      <VolunteerSidebar />
      <div className="ml-64 w-full min-h-screen bg-blue-50 pt-16">
        <VolunteerNavbar />

        <div className="pt-24 px-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Volunteer Dashboard</h2>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow">
              <p className="text-sm text-gray-500">Total Children Added</p>
              <h3 className="text-3xl font-bold text-blue-700">{children.length}</h3>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <p className="text-sm text-gray-500">Approved by Admin</p>
              <h3 className="text-3xl font-bold text-green-600">
                {children.filter((c) => c.status === "Approved").length}
              </h3>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <p className="text-sm text-gray-500">Pending Children</p>
              <h3 className="text-3xl font-bold text-red-500">
                {children.filter((c) => c.status === "Pending").length}
              </h3>
            </div>
          </div>

          {/* Add New Child Button */}
          <Link to="/volunteer/add-child">
            <button className="bg-blue-700 text-white px-6 py-2 rounded-xl hover:bg-blue-800">
              ➕ Add New Child
            </button>
          </Link>

          {/* Search */}
          <div className="mt-8 mb-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 w-full max-w-md border rounded-lg shadow"
            />
          </div>

          {/* Children Table */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">Submitted Children</h3>

            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">Photo</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Age</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {currentChildren.map((child) => (
                  <tr key={child._id} className="border-t hover:bg-gray-100">
                    <td className="p-3">
                      {child.photo ? (
                        <img
                          src={`http://localhost:5000/uploads/${child.photo}`}
                          alt={child.name}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-gray-400">No Photo</span>
                      )}
                    </td>
                    <td className="p-3">{child.name}</td>
                    <td className="p-3">{child.age}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-sm ${
                          child.status === "Approved" ? "bg-green-600" : "bg-yellow-500"
                        }`}
                      >
                        {child.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">
                      {new Date(child.submittedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredChildren.length === 0 && (
              <p className="text-gray-500 mt-4">No child entries found.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
