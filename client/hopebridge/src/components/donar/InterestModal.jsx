import React from 'react';

const InterestModal = ({ selectedChild, onClose }) => {
  if (!selectedChild) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Express Interest</h2>
        <p className="mb-2">You are showing interest in mentoring <strong>{selectedChild.name}</strong>.</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InterestModal;
