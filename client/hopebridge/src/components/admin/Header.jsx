import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => (
  <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
    <div>
      {/* Add logout/profile buttons here if needed */}
      <Link to="/">
      <button className="bg-blue-800 px-3 py-1 rounded hover:bg-blue-900">
        Logout
      </button>
      </Link>
    </div>
  </header>
);

export default Header;
