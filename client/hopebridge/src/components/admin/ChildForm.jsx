import React, { useState, useEffect } from 'react';

const ChildForm = ({ onSubmit, initialData, onCancel }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setAge(initialData.age);
      setStatus(initialData.status);
    } else {
      setName('');
      setAge('');
      setStatus('Pending');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age) return alert('Please fill all required fields.');
    onSubmit({ _id: initialData?._id, name, age, status });  // Pass _id if editing
    setName('');
    setAge('');
    setStatus('Pending');
  };

  return (
    <div className="bg-white shadow rounded p-4 mt-6">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? 'Edit Child' : 'Add New Child'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name *</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter child name"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Age *</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter child age"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {initialData ? 'Update' : 'Add'}
          </button>
          {initialData && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChildForm;
