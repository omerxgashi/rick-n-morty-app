import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Card from './Card.jsx';

// GraphQL query for characters with pagination and filtering
const CHARACTERS_QUERY = gql`
  query GetCharacters($page: Int, $species: String, $status: String) {
    characters(page: $page, filter: { species: $species, status: $status }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
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
  const [page, setPage] = useState(1);
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { loading, error, data, refetch } = useQuery(CHARACTERS_QUERY, {
    variables: { page, species: speciesFilter, status: statusFilter },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { info, results } = data.characters;

  // Pagination handlers
  const handleNextPage = () => {
    if (info.next) {
      setPage(page + 1);
      refetch({ page: page + 1, species: speciesFilter, status: statusFilter });
    }
  };

  const handlePrevPage = () => {
    if (info.prev) {
      setPage(page - 1);
      refetch({ page: page - 1, species: speciesFilter, status: statusFilter });
    }
  };

  // Filter handlers
  const handleSpeciesChange = (e) => {
    const value = e.target.value;
    setSpeciesFilter(value);
    setPage(1); // Reset to first page on filter change
    refetch({ page: 1, species: value, status: statusFilter });
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    setPage(1); // Reset to first page on filter change
    refetch({ page: 1, species: speciesFilter, status: value });
  };

  return (
    <>
      {/* Header */}
      <div className="text-center m-3 img-title">
        <img src="/assets/rm-logo.jpg" alt="Rick and Morty" />
      </div>

      {/* Filter and Sorting */}
      <div className="container-fluid">
        <div className="row">
          <div className="sorting-filter-container d-flex">
            {/* Species Filter */}
            <input
              type="text"
              placeholder="Search by species"
              value={speciesFilter}
              onChange={handleSpeciesChange}
              className="form-control m-2"
            />

            {/* Status Dropdown */}
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="form-select m-2"
            >
              <option value="">All Statuses</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>

          {/* Character Cards */}
          {results.map((character) => (
            <div key={character.id} className="col-3">
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

        {/* Pagination Controls */}
        <div className="pagination-controls d-flex justify-content-center m-3">
          <button
            onClick={handlePrevPage}
            disabled={!info.prev}
            className="btn btn-primary m-2"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={!info.next}
            className="btn btn-primary m-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;