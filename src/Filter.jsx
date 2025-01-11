import React from 'react';

function Filter() {
  return (
    <>
      <div className="filter-input d-flex">
        <form action="">By Species:
          <input type="text" placeholder='Filter here...' /> 
        </form>
        <form action="">By Status:
          <input type="radio" /> 
        </form>
      </div>
    </>
  );
}

export default Filter;
