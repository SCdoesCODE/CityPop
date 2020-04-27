import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ChooseScope from './ChooseScope'
import SearchCountry from './SearchCountry'
import FetchCityPopulation from './FetchCityPopulation'
import { BrowserRouter, Route, Switch } from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
        <App />
       <Switch>
       <Route path="/ChooseScope" component={ChooseScope} />
        <Route path="/SearchCountry" component={SearchCountry} />
         <Route path="/FetchCityPopulation" component={FetchCityPopulation} />

      </Switch>
      </BrowserRouter>,
  document.getElementById('root')
);

/*
ReactDOM.render(
  
  <Router>
      <div>
          <Route path="/App" component = {App}/>
          <Route path="/ChooseScope" component = {ChooseScope}/>
          <Route path="/FetchCountryData" component={FetchCountryData}/>
      </div>
  </Router>,
document.getElementById("root"));

*/