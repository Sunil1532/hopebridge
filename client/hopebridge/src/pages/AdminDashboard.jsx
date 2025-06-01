import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Transition } from '@headlessui/react';
import Header from '../components/admin/Header';
import ChildList from '../components/admin/ChildList';
import ChildForm from '../components/admin/ChildForm';

const API_BASE = 'http://localhost:5000/api/admin/children';

const AdminDashboard = () => {
  const [children, setChildren] = useState([]);
  const [filteredChildren, setFilteredChildren] = useState([]);
  const [editingChild, setEditingChild] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchChildren();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredChildren(children);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredChildren(
        children.filter((child) =>
          child.name.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, children]);

  const fetchChildren = async () => {
    try {
      const res = await axios.get(API_BASE);
      setChildren(res.data);
    } catch (error) {
      alert('Failed to fetch children');
      console.error(error);
    }
  };

  const handleAddOrUpdateChild = async (child) => {
    try {
      if (child.id) {
        const res = await axios.put(`${API_BASE}/${child.id}`, {
          name: child.name,
          age: child.age,
          status: child.status,
        });
        setChildren((prev) =>
          prev.map((c) => (c.id === child.id ? res.data : c))
        );
      } else {
        const res = await axios.post(API_BASE, {
          name: child.name,
          age: child.age,
          status: child.status,
        });
        setChildren((prev) => [...prev, res.data]);
      }
      setEditingChild(null);
      setShowForm(false);
    } catch (error) {
      alert('Failed to save child');
      console.error(error);
    }
  };

  const handleEdit = (child) => {
    setEditingChild(child);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this child?')) {
      try {
        await axios.delete(`${API_BASE}/${id}`);
        setChildren((prev) => prev.filter((c) => c.id !== id));
        if (editingChild?.id === id) setEditingChild(null);
      } catch (error) {
        alert('Failed to delete child');
        console.error(error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingChild(null);
    setShowForm(false);
  };

  const total = children.length;
  const approved = children.filter((c) => c.status === 'Approved').length;
  const pending = children.filter((c) => c.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage children records, edit statuses, and track registrations.</p>
          </div>
          <button
            onClick={() => {
              setEditingChild(null);
              setShowForm(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            + Add New Child
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="text-xl font-semibold text-indigo-700">{total}</h2>
            <p className="text-gray-500">Total Children</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="text-xl font-semibold text-green-600">{approved}</h2>
            <p className="text-gray-500">Approved</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="text-xl font-semibold text-yellow-500">{pending}</h2>
            <p className="text-gray-500">Pending</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search children by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Child List */}
        {filteredChildren.length > 0 ? (
          <ChildList children={filteredChildren} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <div className="text-center text-gray-600 py-12">
            <p className="text-lg">No children found.</p>
          </div>
        )}

        {/* Divider */}
        <div className="my-10 border-t border-gray-300"></div>

        {/* Add/Edit Form */}
        <Transition
          show={showForm}
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 scale-95 translate-y-4"
          enterTo="opacity-100 scale-100 translate-y-0"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100 scale-100 translate-y-0"
          leaveTo="opacity-0 scale-95 translate-y-4"
          className="mt-10 max-w-3xl mx-auto"
        >
          <div>
            <ChildForm
              key={editingChild?.id || 'new'}
              onSubmit={handleAddOrUpdateChild}
              initialData={editingChild}
              onCancel={handleCancelEdit}
            />
          </div>
        </Transition>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-10">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} HopeBridge Admin Panel. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
