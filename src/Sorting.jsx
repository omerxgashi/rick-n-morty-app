import React from 'react';

function Sorting({ sortOrder, setSortOrder }) {
  return (
    <div className="sorting d-flex align-items-center">
      <label>Sort by:</label>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="sorting-select form-select m-2"
      >
        <option value="">Select</option>
        <option value="nameAsc">Name A-Z</option>
        <option value="nameDesc">Name Z-A</option>
        <option value="originAsc">Origin A-Z</option>
        <option value="originDesc">Origin Z-A</option>
      </select>
    </div>
  );
}

export default Sorting;
