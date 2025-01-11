import React from 'react';
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Card from './Card.jsx';
import Filter from './Filter.jsx';
import Sorting from './Sorting.jsx';

// Define GraphQL query to fetch character data
const CHARACTERS_QUERY = gql`
  query {
    characters(page:2) {
      results {
        name
        status
        species
        gender
        image
        origin {
          name
        }
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(CHARACTERS_QUERY);  // this will fetch the data from api

 

  if (loading) return <p>Loading...</p>;  // Loading state
  if (error) return <p>Error: {error.message}</p>;  // Error handling

 
  return (
    <>
 

    <div className="text-center m-3 img-title">
      <img src="/assets/rm-logo.jpg" alt="" />
    </div>
    <div className="header-title">

      
    </div>
      <div className='container-fluid'>

       
      <div className="row">

      <div className='sorting-filter-container d-flex'>

        <div className='filter'>
        <button type="button" className="filter-btn">Filter</button>
        </div>
        <div className='sort'>
          <button type="button" className="sort-btn">Sort</button>
          </div>
      </div>
       
        {data.characters.results.map((character) => (
          
          <div key={character.name} className="col-3"> 
            
            <Card 
              name={character.name}
              status={character.status}
              species={character.species}
              gender={character.gender}
              origin={character.origin.name}
              image={character.image}
              />
          </div>
        ))}
        
      </div>
        </div>
    </>
  );
}

export default App;
