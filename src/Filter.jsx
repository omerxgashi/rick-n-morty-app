import React from 'react';

function Filter({ speciesFilter, statusFilter, onSpeciesChange, onStatusChange }) {
  return (
    <></>
    // <div className="sorting-filter-container d-flex">
    //   {/* Species Filter */}
    //   <input
    //     type="text"
    //     placeholder="Search by species"
    //     value={speciesFilter}
    //     onChange={onSpeciesChange}
    //     className="form-control m-2"
    //   />

    //   {/* Status Dropdown */}
    //   <select
    //     value={statusFilter}
    //     onChange={onStatusChange}
    //     className="form-select m-2"
    //   >
    //     <option value="">All Statuses</option>
    //     <option value="Alive">Alive</option>
    //     <option value="Dead">Dead</option>
    //     <option value="unknown">Unknown</option>
    //   </select>
    // </div>
  );
}

export default Filter;
