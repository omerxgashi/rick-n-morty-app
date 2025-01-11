import React from 'react';

function Sorting({ sortOption, setSortOption }) {
  return (
    <div className="sorting">
      <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
        <option value="name">Sort by Name</option>
        <option value="origin">Sort by Origin</option>
      </select>
    </div>
  );
}

export default Sorting;
