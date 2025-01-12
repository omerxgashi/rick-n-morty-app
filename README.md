# # This is a simple React application that uses Apollo Client to fetch and display a list of Rick and Morty characters from the Rick and Morty GraphQL API. The app features filtering, sorting, pagination, and internationalization (i18n) with a language toggle for switching between languages.

Features
Character List: Displays Name, Status, Species, Gender, and Origin of characters.
Filtering: Allows filtering by Status and Species.
Sorting: Sort characters by Name and Origin.
Pagination: Navigate through pages of characters using Previous and Next buttons.
Internationalization (i18n): Switch between English and German languages.

Technologies Used:

-React
-Apollo Client
-GraphQL
-i8next
-Bootstrap

Prerequisites

1. Clone the Repository

git clone https://github.com/omerxgashi/rick-n-morty-app
cd <project_directory>

2.Install Dependencies

npm install

3.Run the Application

npm start

-Language Switcher
The app includes an i18n feature, allowing users to switch between languages in the footer:

English
German

When a user switches the language, the field names (e.g., Name, Status) will update according to the selected language.
To add more languages, you can modify the i18n configuration and add translation files in the public/locales directory.

-Pagination
The app implements pagination using Previous and Next buttons to navigate through the list of characters.

The Next button fetches the next set of characters.
The Previous button allows the user to go back to the previous page.

-GraphQL and Apollo Client Setup
In this project, Apollo Client is used to interact with the Rick and Morty GraphQL API. Apollo Client simplifies querying data, handling loading and error states, and managing the state of your app. Below are the steps for setting up Apollo Client and GraphQL integration.


. Install Apollo Client and GraphQL

npm install @apollo/client graphql


Setting Up Apollo Client in 'main.jsx'
In this project, Apollo Client is set up directly in the main.jsx file. Here’s how the Apollo Client is initialized and wrapped around the app:

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'; 
import App from './App';
import './main.css';

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
---------------------------------------------------------------------------

Querying Data with Apollo Client
Now you can use Apollo Client to fetch data from the GraphQL API. Example of how to query the list of characters.

Define a GraphQL query in your component:

import { gql, useQuery } from '@apollo/client';

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
      }
    }
  }
`;

----------------------------------------------------------------------------------

Summary of GraphQL and Apollo Client Setup
-Apollo Client is used to manage all GraphQL queries and state.
-The Apollo Client instance is set up in main.jsx and passed to the app via ApolloProvider.
-useQuery is used to fetch data from the GraphQL API with pagination support.
-The app uses Previous and Next buttons for navigating through the pages of characters.
-Error handling and loading states are managed using Apollo Client’s hooks.
