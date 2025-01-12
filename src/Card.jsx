import React from 'react';

function Card({ name, status, species, gender, origin, image }) {
  return (
    <div className="card">
      <img src={image} alt={name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          <strong>Status:</strong> {status} <br />
          <strong>Species:</strong> {species} <br />
          <strong>Gender:</strong> {gender} <br />
          <strong>Origin:</strong> {origin}
        </p>
      </div>
    </div>
  );
}

export default Card;
