import React from 'react';
import ChooseScope from './ChooseScope';
import FetchCountryData from './FetchCountryData'



function App() {
  return (
    <>
    
    <FetchCountryData/>
    </>
  );
}

export default App;

/*

DONE

Fetch country and population of countries from api (case insensitive)
Started on CSS stylesheet

TODO

Figure out how to link between pages
How to make country/city and population not visible before the user has submitted
City page
Avoid error when a search result cannot be found
*/