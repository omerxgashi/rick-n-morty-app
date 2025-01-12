import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Card from './Card.jsx';
import Sorting from './Sorting.jsx';
import Filter from './Filter.jsx';
import Footer from './Footer.jsx';
import { useTranslation } from 'react-i18next'; 
import './i18n.jsx'; 

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
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [debouncedSpecies, setDebouncedSpecies] = useState(speciesFilter);

  const { loading, error, data, refetch } = useQuery(CHARACTERS_QUERY, {
    variables: { page, species: debouncedSpecies, status: statusFilter },
  });

  const { t, i18n } = useTranslation();


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSpecies(speciesFilter);
    }, 1000); 
    return () => clearTimeout(timer);
  }, [speciesFilter]); 

  
  useEffect(() => {
    if (debouncedSpecies !== speciesFilter) {
      refetch({ page: 1, species: debouncedSpecies, status: statusFilter });
    }
  }, [debouncedSpecies, statusFilter, refetch]); 

  if (loading) return <p>{t('loading')}</p>;
  if (error) return <p>{t('error')}: {error.message}</p>;

  const { info, results } = data.characters;

  let sortedResults = results.slice();

  if (sortOrder) {
    sortedResults.sort((item1, item2) => {
      const compare = (item1, item2, field) => {
        return (item1[field] || '').localeCompare(item2[field] || '');
      };
      if (sortOrder === 'nameAsc') {
        return compare(item1, item2, 'name');
      }
      if (sortOrder === 'nameDesc') {
        return compare(item2, item1, 'name');
      }
      if (sortOrder === 'originAsc') {
        return compare(item1, item2, 'origin.name');
      }
      if (sortOrder === 'originDesc') {
        return compare(item2, item1, 'origin.name');
      }

      return 0;
    });
  }

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };
  
  return (
    <>
     

      <div className="text-center m-3 img-title">
        <img src="./assets/rick_morty.png" alt="Rick and Morty" />
      </div>
<div className="container">
  <div className="row">
    <div className="sorting-filter-container d-flex flex-column flex-sm-row align-items-center">
      <Filter 
        speciesFilter={speciesFilter} 
        setSpeciesFilter={setSpeciesFilter} 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter} 
      />
      <div className="reset-sort">
        <Sorting 
          sortOrder={sortOrder} 
          setSortOrder={setSortOrder} 
        />
        <div className="res-button">
          <button 
            onClick={() => {
              setSpeciesFilter('');
              setStatusFilter('');
              setSortOrder('');
            }} 
            className="reset-btn m-2">
            {t('resetFilters')}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="container">
  <div className="row">
    {sortedResults.map(character => (
      <div key={character.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
        <Card
          name={character.name}
          status={t(`status_${character.status.toLowerCase()}`)} 
          species={t(`${character.species}`)}
          gender={t(`${character.gender.toLowerCase()}`)}
          origin={character.origin?.name || t('unknownOrigin')}
          image={character.image}
        />
      </div>
    ))}
  </div>

  <div className="pagination-controls d-flex justify-content-center flex-wrap m-3">
    <button
      onClick={() => setPage(page - 1)}
      disabled={!info.prev}
      className="btn btn-primary m-2"
    >
      {t('previous')}
    </button>
    <button
      onClick={() => setPage(page + 1)}
      disabled={!info.next}
      className="btn btn-primary m-2"
    >
      {t('next')}
    </button>
  </div>
</div>

      
<Footer />
    </>
  );
}


export default App;
