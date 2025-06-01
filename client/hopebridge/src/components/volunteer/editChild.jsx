import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function editChild() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState(null);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing child data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/volunteer/children/${id}`)
      .then((res) => {
        setName(res.data.name);
        setAge(res.data.age);
        setCurrentPhotoUrl(`http://localhost:5000/uploads/${res.data.photo}`);
      })
      .catch(() => alert("Failed to load child data."));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    if (photo) formData.append("photo", photo);

    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/volunteer/children/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Child updated successfully!");
      navigate("/volunteer/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to update child.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">Edit Child</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            min="1"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Current Photo</label>
          {currentPhotoUrl ? (
            <img
              src={currentPhotoUrl}
              alt="Child"
              className="w-40 h-40 object-cover rounded mb-2 border"
            />
          ) : (
            <p>No photo available</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Change Photo (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
