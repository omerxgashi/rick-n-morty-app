import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'; // Import Apollo Client and ApolloProvider
import App from './App';
import './main.css' 

// Set up Apollo Client
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',  
  cache: new InMemoryCache(),
});

// Main component that wraps the App component with ApolloProvider
function Main() {
  return (
    <ApolloProvider client={client}>  {/* Apollo Client context */}
      <App />  {/* Your main app component */}
    </ApolloProvider>
  );
}

// Render the Main component inside StrictMode
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />  {/* The root app is wrapped with ApolloProvider */}
  </StrictMode>,
);
