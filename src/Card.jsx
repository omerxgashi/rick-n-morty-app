import React from 'react';

function Card({ name, status, species, gender, origin, image }) {
  return (
   
    
    <div className="card d-flex">
      <img src={image} alt={name} className="card-img-left" />
      <div className="card-body p-2">
        <h6 className="card-title">{name}</h6>
        <p className="card-text m-2"><strong>Status:</strong> {status}</p>
        <p className="card-text m-2"><strong>Species:</strong> {species}</p>
        <p className="card-text m-2"><strong>Gender:</strong> {gender}</p>
        <p className="card-text m-2"><strong>Origin:</strong> {origin}</p>
      </div>
    </div>

  );
}

export default Card;
