import React from 'react';
import ChooseScope from './ChooseScope';
import FetchCountryData from './FetchCountryData'
import FetchCityPopulation from './FetchCityPopulation'
import FetchCityPopsForCountry from './FetchCityPopsForCountry'
import SearchCountry from './SearchCountry'



function App() {
  return (
    <>
    
    <FetchCityPopulation/>
    </>
  );
}

export default App;

/*

DONE

Fetch city population from api (case insensitive)
Started on CSS stylesheet

TODO

Figure out how to link between pages
How to make country/city and population not visible before the user has submitted
Avoid error when a search result cannot be found
More styling
When displaying population, use regex(or something similar) to put spaces between the thousans
Country page
  use search to get information on country
  collect all cities by searching for (name) in an array
  use search again iteratively to get population for each city
  collect these in another array and sort
  show only the cities with the highest population

*/