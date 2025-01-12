import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'; 
import App from './App';
import './main.css' 

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',  
  cache: new InMemoryCache(),
});

function Main() {
  return (
    <ApolloProvider client={client}>  
      <App />  
    </ApolloProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />  
  </StrictMode>,
);
