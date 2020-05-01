import React, { Component } from "react";
import './style.css'

/*

The user inputs a city
The program displays the population of that city

The user can input a country as well, and that would work
Not sure if I should implement some error message if the input is not a city

TODO

can't do tolocalstring without getting error atm

*/
export default class FetchCountryData extends Component {
    state = {
        beforeSearch : true,
        showLoading: false,
        loading: true,
        city: '',
        cityInput: ''
    };
    
    handleOnChange = event => {
        this.setState({ cityInput: event.target.value });
    };
    handleSearch = () => {
        this.setState({ showLoading: true , beforeSearch : false});
        this.makeApiCall(this.state.cityInput);
    };
    async makeApiCall(input) {
        let city = input
        const url = "http://api.geonames.org/searchJSON?name="+ city +"&maxRows=1&username=weknowit";
        const response = await fetch(url);
        const data = await response.json();
        /*let entryIndex = data.geonames.findIndex(entry => entry.name.toUpperCase() === input.toUpperCase());*/
        this.setState({ city: data.geonames[0], loading: false });
        this.setState({ showLoading: false });
    }
    render() {
        return (<div className="center">
            <div className = 'citypoptext'>CityPop</div>
            <h1>SEARCH BY A CITY</h1>
            <input name="text" type="text" placeholder="Search" onChange={event => this.handleOnChange(event)} value={this.state.cityInput} />
            <button onClick={this.handleSearch}>Search</button>
            {this.state.showLoading && !this.state.beforeSearch? (<div> loading
            </div>) : (<div>
                <div>City : {this.state.city.name}</div>
            {/*<div><h1>{this.state.city.name.toUpperCase()}</h1><div className = "resultcontainer"><div className = "chosencitybox"><span className = "newline">POPULATION</span><h1>{this.state.city.population.toLocaleString().replace(/,/g," ",)}</h1></div></div></div>*/}
                <div className = "resultbox">Population : {this.state.city.population}</div>
            </div>)}
        </div>);
    }
}

