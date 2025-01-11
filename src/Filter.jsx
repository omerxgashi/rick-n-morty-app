import React from 'react';

function Filter({ statusFilter, setStatusFilter, speciesFilter, setSpeciesFilter }) {
  return (
    <div className="filters">
      <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
        <option value="">Filter by Status</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select onChange={(e) => setSpeciesFilter(e.target.value)} value={speciesFilter}>
        <option value="">Filter by Species</option>
        <option value="Human">Human</option>
        <option value="Alien">Alien</option>
        <option value="Robot">Robot</option>
        {/* Add more species options as needed */}
      </select>
    </div>
  );
}

export default Filter;
