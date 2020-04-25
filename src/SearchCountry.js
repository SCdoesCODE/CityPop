import React, { Component } from "react";
import './style.css'

/*

http://www.geonames.org/export/codes.html
featureCode = PPLA for seat of a first-order administrative division
featureCode = PPLC to include the capital

User inputs country and the program returns the top cities and their populations

TODO

shows loading from the beginning, should not be shown before user has pressed search
search should be invoked through enter also
styling

instead of showing error when country cannot be found - display some text

Do test to see if input is case-insensitive

*/

export default class FetchCityPopsForCountry extends Component {

    
   
    numberOfCountriesToDisplay = 3
    divResults = []
    cities = []
    
    state = {
        
        showLoading: true,
        country: '',
        countryInput: ''
    };
    /*update the user input*/ 
    handleOnChange = event => {
        this.setState({ countryInput: event.target.value });
    };

    /*Make API call upon user pressing search-button*/
    handleSearch = () => {
        this.makeApiCall(this.state.countryInput);
    };

    /*
    Receives the input string from user, this input is likely the name of a country
    Fetches countrycode for that country from restcountries API
    Searches for all cities belonging to this countrycode using geonames API
    */
    async makeApiCall(input) {
        const urlCode = "https://restcountries.eu/rest/v2/name/" + input;
        const responseCode = await fetch(urlCode);
        const dataCode = await responseCode.json();
        let countryCode = dataCode[0].alpha2Code
        const url = "http://api.geonames.org/searchJSON?&country="+countryCode+"&featureCode=PPLA&featureCode=PPLC&username=weknowit";
        const response = await fetch(url);
        const data = await response.json();
        /*For each city : add its name and population to the cities array, as an object*/ 
        data.geonames.forEach(cityEntry => {
            this.cities.push({population : cityEntry.population,name : cityEntry.name})
                }) 
        /*Sort the cities array according to the attribute : population*/
        this.cities.sort(function(a, b) {
            return (a.population > b.population) ? -1:+1;
            });
        /*Update country with the help of geonames in case user misspelled*/
        this.setState({ country: data.geonames[0].countryName,showLoading: false});
        
    }

    /*
    Invoked after user has already searched for something
    */

    undoResults(){
        this.divResults = []
        this.cities = []
    }

    render() {

        /*populate the divResults array with divs displaying city-name and population*/
        this.cities.forEach(cityEntry =>{(this.divResults.push(
        <div>
        <br/>
        <div>City : {cityEntry.name}</div>
        <div>Population : {cityEntry.population}</div>
        </div>))
        }
        )

        return (<div className="center">
            <h1>Search by country</h1>
            <input name="text" type="text" placeholder="Search" onChange={event => this.handleOnChange(event)} value={this.state.countryInput} />
            <button onClick={this.handleSearch}>Search</button>
            {this.state.showLoading ? (<div> loading
            </div>) : (<div>
                <br/>
                <div>Country : {this.state.country}</div>
                {this.divResults.splice(0,this.numberOfCountriesToDisplay)}
                {this.undoResults()}
            </div>)}
        </div>);
    }
}