import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddChild() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState("");
  const [background, setBackground] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age || !photo) {
      alert("Please fill all required fields including photo");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("location", location);
    formData.append("education", education);
    formData.append("background", background);
    formData.append("photo", photo);
    formData.append("status", "Pending");

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/volunteer/children", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Child added successfully!");
      navigate("/volunteer");
    } catch (error) {
      console.error(error);
      alert("Failed to add child.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-blue-50 rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">Add New Child</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name *</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter child's name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Age *</label>
          <input
            type="number"
            min="1"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            placeholder="Enter child's age"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Education</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            placeholder="Enter education status"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Background Info</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="Enter child's background or story"
            rows="3"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Photo *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
