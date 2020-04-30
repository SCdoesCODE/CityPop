import React, { Component } from "react";
import './style.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

/*

https://programmingwithmosh.com/react/font-awesome-5-with-react/
font awesome for react

http://www.geonames.org/export/codes.html
featureCode = PPLA for seat of a first-order administrative division
featureCode = PPLC to include the capital

User inputs country and the program returns the top cities 

TODO

--DONEshows loading from the beginning, should not be shown before user has pressed search
--DONEsearch should be invoked through enter also
styling

instead of showing error when country cannot be found - display some text

Do test to see if input is case-insensitive

--DONEshow cities first, then let user pick city, 

then display the population of that city

*/

export default class FetchCityPopsForCountry extends Component {

    numberOfCountriesToDisplay = 3
    divResults = []
    cities = []
    
    state = {
        
        showLoading: false,
        country: '',
        countryInput: '',
        searchingForNewCountry : false,
        displayCities : false,
        oneCityChosen : false,
        chosenCityName : '',
        chosenCityPop : ''
    };
    

    /*Make API call upon user pressing search-button*/
    handleSearch = () => {
        this.makeApiCall(this.state.countryInput);
        this.setState({ searchingForNewCountry :  true, showLoading : true});
    };

    /*update the user input*/ 
    handleOnChange = event => {
    
        this.setState({ countryInput: event.target.value });
    };

    handleOnKeyDown = event =>{
        if(event.key === "Enter"){
            this.handleSearch()
        }

    }

    handleOnKeyPressed = cityIndex =>{
        this.setState({ oneCityChosen: true , chosenCityName : this.cities[cityIndex].name, chosenCityPop : this.cities[cityIndex].population});
        this.undoResults()
    }

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
        this.setState({ country: data.geonames[0].countryName,showLoading: false, displayCities : true});
        
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
        <div className = "resultbox">{cityEntry.name}</div>
        {/*<div>Population : {cityEntry.population.toLocaleString().replace(/,/g," ",)}</div>*/}
        </div>))
        }
        )

        return (<div className="center">
            <div className = 'citypoptext'>CityPop</div>
            {this.state.searchingForNewCountry ? <h1>{this.state.country.toUpperCase()}</h1> : <h1>SEARCH BY A COUNTRY</h1>}
            {!this.state.displayCities ? <div>
                <input className = "searchbox" name="text" type="text" placeholder="Search" onKeyDown = {event => this.handleOnKeyDown(event)} onChange={event => this.handleOnChange(event)} value={this.state.countryInput} />
            <div><FontAwesomeIcon className = "searchbutton"  onClick={this.handleSearch} icon={faSearch} size="2x"/></div>
            </div> : this.state.oneCityChosen ? <div><div>{this.state.chosenCityName}</div><div>{this.state.chosenCityPop}</div></div> :
            (<div>
                <br/>
                {/*this.divResults.splice(0,this.numberOfCountriesToDisplay)*/}
                <div>
                <br/>
                <div onClick = {() => {this.handleOnKeyPressed(0)}}  className = "resultbox">{this.cities[0].name}</div>
                <div onClick = {() => {this.handleOnKeyPressed(1)}} className = "resultbox">{this.cities[1].name}</div>
                <div onClick = {() => {this.handleOnKeyPressed(2)}} className = "resultbox">{this.cities[2].name}</div>
                </div>
            </div>)
            }
            {this.state.showLoading ? 
            (<div> loading </div> ) 
            : null}
        </div>);
    }
}