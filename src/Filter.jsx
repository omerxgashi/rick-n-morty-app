import React, { useState } from 'react';
// import debounce from 'lodash.debounce';


function Filter({ speciesFilter, setSpeciesFilter, statusFilter, setStatusFilter }) {
  

  return (
    <div className="search_input d-flex align-items-center">
      <div className="input_field">
  
      <input
        type="text"
        placeholder="Search by species"
        value={speciesFilter}
        onChange={(e) => setSpeciesFilter(e.target.value)}
        className="form-control m-2"
        />
        </div>
      
      <div className="status_box d-flex align-items-center m-2">
        <label>Status:</label>
         All
        <input
          type="radio"
          name="status"
          value="Alive"
          checked={statusFilter === 'Alive'}
          onChange={(e) => setStatusFilter(e.target.value)}
          className='alive-input'
        /> Alive <img src="./assets/heart-beating.png" alt="Alive" className='heart-icon' /><hr />

        <input
          type="radio"
          name="status"
          value="Dead"
          checked={statusFilter === 'Dead'}
          onChange={(e) => setStatusFilter(e.target.value)}
        /> Dead <img src="./assets/danger.png" alt="Dead" className='dead-icon'/><hr />

        <input
          type="radio"
          name="status"
          value="unknown"
          checked={statusFilter === 'unknown'}
          onChange={(e) => setStatusFilter(e.target.value)}
        /> Unknown <img src="./assets/question-mark.png" alt="Unknown" className='unknown' /><hr />
      </div>
      
    </div>
  );
}


export default Filter;
