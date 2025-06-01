import React from 'react';

const FilterBar = ({ searchQuery, setSearchQuery, educationFilter, setEducationFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-start items-center mb-6 max-w-3xl mx-auto">
      <input
        type="text"
        placeholder="Search by name or location"
        className="w-full sm:w-2/5 px-4 py-2 border rounded-xl shadow-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        className="w-full sm:w-1/4 px-4 py-2 border rounded-xl shadow-sm"
        value={educationFilter}
        onChange={(e) => setEducationFilter(e.target.value)}
      >
        <option value="">All Education Levels</option>
        <option value="4th Grade">4th Grade</option>
        <option value="5th Grade">5th Grade</option>
        <option value="6th Grade">6th Grade</option>
      </select>
    </div>
  );
};

export default FilterBar;
