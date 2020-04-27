import React from 'react';
import ChooseScope from './ChooseScope';
import FetchCityPopulation from './FetchCityPopulation'
import SearchCountry from './SearchCountry'
import './style.css'


function App() {
  return (
    <>
    
    <ChooseScope/>
    </>
  );
}

export default App;

/*

DONE

Fetch city population from api (case insensitive)
Started on CSS stylesheet
Made country/city and population not visible before the user has submitted
Country page
  use search to get information on country
  collect all cities by searching for (name) in an array
  use search again iteratively to get population for each city
  collect these in another array and sort
  show only the cities with the highest population
Figure out how to link between pages

TODO

Avoid error when a search result cannot be found
More styling
When displaying population, use regex(or something similar) to put spaces between the thousans
Page where user chooses either to choose by city or country


*/