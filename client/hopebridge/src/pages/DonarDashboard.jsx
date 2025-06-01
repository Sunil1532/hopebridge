import React, { useState, useEffect } from "react";
import ChildCard from "../components/donar/ChildCard";

const DonorDashboard = () => {
  const [childrenData, setChildrenData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [interestedChildren, setInterestedChildren] = useState([]);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/volunteer/children");
        if (!res.ok) throw new Error("Failed to fetch children data");
        const data = await res.json();
        setChildrenData(data);
      } catch (error) {
        console.error(error);
        alert("Error loading children data");
      }
    };

    fetchChildren();
  }, []);

  const filteredChildren = childrenData.filter(
    (child) =>
      child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (child.location && child.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleExpressInterest = (child) => {
    const confirmInterest = window.confirm(`Do you want to express interest in ${child.name}?`);
    if (confirmInterest) {
      setInterestedChildren((prev) =>
        prev.find((c) => c._id === child._id) ? prev : [...prev, child]
      );
      alert(`You have expressed interest in ${child.name}.`);
    }
  };

  const handleDonate = (child) => {
    alert(`Thank you for choosing to donate to ${child.name}! This feature is coming soon.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-12">Welcome, Donor</h2>

      {/* 🔍 Search */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="🔍 Search by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-lg p-4 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 🔽 Children List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {filteredChildren.length > 0 ? (
          filteredChildren.map((child) => (
            <ChildCard
              key={child._id}
              child={child}
              onExpressInterest={handleExpressInterest}
              onDonate={handleDonate}
            />
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No children match your search criteria.
          </p>
        )}
      </div>

      {/* 💖 Interested Children Section */}
      {interestedChildren.length > 0 && (
        <section className="mt-16 max-w-7xl mx-auto">
          <h3 className="text-3xl font-semibold text-blue-800 mb-8 text-center">
            💖 Children You’ve Expressed Interest In
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {interestedChildren.map((child) => (
              <ChildCard
                key={child._id}
                child={child}
                onExpressInterest={() => {}}
                onDonate={handleDonate}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DonorDashboard;
