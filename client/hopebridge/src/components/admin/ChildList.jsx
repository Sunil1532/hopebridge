import React from 'react';

const ChildList = ({ children, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Children List</h2>
      {children.length === 0 ? (
        <p className="text-gray-500">No children added yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Age</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {children.map((child) => (
              <tr key={child._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{child.name}</td>
                <td className="border border-gray-300 px-4 py-2">{child.age}</td>
                <td className="border border-gray-300 px-4 py-2">{child.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => onEdit(child)}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(child._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ChildList;
