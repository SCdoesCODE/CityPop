import React, { Component } from "react";
import './style.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch ,faHome} from '@fortawesome/free-solid-svg-icons'
import { BallSpinFadeLoader } from 'react-pure-loaders';
import {Link } from "react-router-dom";

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
        city: '',
        cityInput: '',
        displayCityPop : false,
        cityNotFound : false
    };

    

    handleBack = () => {
        this.props.history.goBack()
      }
    
    handleOnChange = event => {
        this.setState({ cityInput: event.target.value });
    };

    handleOnKeyDown = event =>{
        if(event.key === "Enter"){
            this.handleSearch()
        }

    }

    handleSearch = () => {
        this.setState({ showLoading: true , beforeSearch : false});
        this.makeApiCall(this.state.cityInput);
    };
    async makeApiCall(input) {
        let city = input
        const url = "http://api.geonames.org/searchJSON?name="+ city +"&maxRows=1&username=weknowit";
        const response = await fetch(url);
        const data = await response.json();
        if(data.geonames.length === 0){
            this.setState({ cityNotFound : true });
        }
        /*let entryIndex = data.geonames.findIndex(entry => entry.name.toUpperCase() === input.toUpperCase());*/
        this.setState({ city: data.geonames[0] });
        this.setState({ showLoading: false , displayCityPop : true});
    }
    render() {
        return (
            
        
        <div className="center">
            <Link to ='./ChooseScope' ><FontAwesomeIcon className = "homebutton" icon={faHome} size="2x" /></Link>
            <div className = 'citypoptext'>CityPop</div>
            {this.state.displayCityPop ? null : 
            <div><h1>SEARCH BY CITY</h1>
            <input className = "searchbox" name="text" type="text" placeholder="Enter a city" onKeyDown = {event => this.handleOnKeyDown(event)} onChange={event => this.handleOnChange(event)} value={this.state.cityInput} />
            <div><FontAwesomeIcon className = "searchbutton"  onClick={this.handleSearch} icon={faSearch} size="2x"/></div></div>}
            
            {this.state.showLoading ? <div> loading </div> : null }
            {this.state.displayCityPop & !this.state.cityNotFound ? 
            <div>
                <h1>{this.state.city.name}</h1>
                <div className = "chosencitybox"><span className = "newline">POPULATION</span><h1>{this.state.city.population.toLocaleString().replace(/,/g," ",)}</h1></div>
            </div> : null}
            {this.state.cityNotFound ? <h1>Could not find "{this.state.cityInput}"</h1> : null}
            {/*loader activated when this.state.showLoading is true*/}
            <div  className = "loadingspinner"> <BallSpinFadeLoader  color={'#000000'} loading={this.state.showLoading}/></div> 
        </div>);
        
    }
}

