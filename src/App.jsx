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
  const [sortOrder, setSortOrder] = useState(''); 
  // sortOrder can be '', 'nameAsc', 'nameDesc', 'originAsc', 'originDesc'.

  const { loading, error, data, refetch } = useQuery(CHARACTERS_QUERY, {
    variables: { page, species: speciesFilter, status: statusFilter },
  });

  // 1) Early returns for loading / error
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // 2) Destructure the API response
  const { info, results } = data.characters;

  // ─────────────────────────────────────────────────────────────────────────────
  // Pagination Handlers
  // ─────────────────────────────────────────────────────────────────────────────
  const handleNextPage = () => {
    if (info.next) {
      const newPage = page + 1;
      setPage(newPage);
      refetch({ page: newPage, species: speciesFilter, status: statusFilter });
    }
  };

  const handlePrevPage = () => {
    if (info.prev) {
      const newPage = page - 1;
      setPage(newPage);
      refetch({ page: newPage, species: speciesFilter, status: statusFilter });
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Filter Handlers
  // ─────────────────────────────────────────────────────────────────────────────
  const handleSpeciesChange = (e) => {
    const value = e.target.value;
    setSpeciesFilter(value);
    setPage(1);
    refetch({ page: 1, species: value, status: statusFilter });
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    setPage(1);
    refetch({ page: 1, species: speciesFilter, status: value });
  };

  const handleResetFilters = () => {
    setSpeciesFilter('');
    setStatusFilter('');
    setSortOrder('');
    setPage(1);
    refetch({ page: 1, species: '', status: '' });
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Sorting (No useMemo)
  // ─────────────────────────────────────────────────────────────────────────────
  // We create a sorted copy of "results" on every render, based on "sortOrder".
  let sortedResults = [];
  if (results && results.length > 0) {
    sortedResults = [...results]; // create a copy

    switch (sortOrder) {
      case 'nameAsc':
        sortedResults.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        sortedResults.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'originAsc':
        sortedResults.sort((a, b) => {
          const originA = a.origin?.name || '';
          const originB = b.origin?.name || '';
          return originA.localeCompare(originB);
        });
        break;
      case 'originDesc':
        sortedResults.sort((a, b) => {
          const originA = a.origin?.name || '';
          const originB = b.origin?.name || '';
          return originB.localeCompare(originA);
        });
        break;
      default:
        // No sorting
        break;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Header */}
      <div className="text-center m-3 img-title">
        <img src="/assets/rm-logo.jpg" alt="Rick and Morty" />
      </div>

      <div className="container-fluid">
        <div className="row">
          {/* Filters & Sorting */}
          <div className="sorting-filter-container d-flex align-items-center">
            
            {/* Species Filter */}
            <input
              type="text"
              placeholder="Search by species"
              value={speciesFilter}
              onChange={handleSpeciesChange}
              className="form-control m-2"
            />

            {/* Status Radio Buttons */}
            <div className="d-flex align-items-center m-2">
              <label className="me-2 fw-bold">Status:</label>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="statusOptions"
                  id="statusAll"
                  value=""
                  checked={statusFilter === ''}
                  onChange={handleStatusChange}
                />
                <label className="form-check-label" htmlFor="statusAll">
                  All
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="statusOptions"
                  id="statusAlive"
                  value="Alive"
                  checked={statusFilter === 'Alive'}
                  onChange={handleStatusChange}
                />
                <label className="form-check-label" htmlFor="statusAlive">
                  Alive
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="statusOptions"
                  id="statusDead"
                  value="Dead"
                  checked={statusFilter === 'Dead'}
                  onChange={handleStatusChange}
                />
                <label className="form-check-label" htmlFor="statusDead">
                  Dead
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="statusOptions"
                  id="statusUnknown"
                  value="unknown"
                  checked={statusFilter === 'unknown'}
                  onChange={handleStatusChange}
                />
                <label className="form-check-label" htmlFor="statusUnknown">
                  Unknown
                </label>
              </div>
            </div>

            {/* Sorting Options */}
            <div className="d-flex align-items-center m-2">
              <label className="me-2 fw-bold">Sort by:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="form-select"
              >
                <option value="">None</option>
                <option value="nameAsc">Name A-Z</option>
                <option value="nameDesc">Name Z-A</option>
                <option value="originAsc">Origin A-Z</option>
                <option value="originDesc">Origin Z-A</option>
              </select>
            </div>

            {/* Reset Filters Button */}
            <button onClick={handleResetFilters} className="btn btn-secondary m-2">
              Reset Filters
            </button>
          </div>

          {/* Character Cards */}
          {sortedResults.map((character) => (
            <div key={character.id} className="col-3">
              <Card
                name={character.name}
                status={character.status}
                species={character.species}
                gender={character.gender}
                origin={character.origin?.name || 'Unknown Origin'}
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