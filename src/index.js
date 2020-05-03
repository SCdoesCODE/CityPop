import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ChooseScope from './ChooseScope'
import SearchCountry from './SearchCountry'
import SearchCity from './SearchCity'

import { BrowserRouter, Route, Switch } from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
        
        <App />
       <Switch>
       <Route path="/ChooseScope" component={ChooseScope} />
        <Route path="/SearchCountry" component={SearchCountry} />
         <Route path="/SearchCity" component={SearchCity} />
      </Switch>
      </BrowserRouter>,
  document.getElementById('root')
);

