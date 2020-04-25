import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ChooseScope from './ChooseScope'
import {BrowserRouter as Router, Route} from "react-router-dom"


ReactDOM.render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>,
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