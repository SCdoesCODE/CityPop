import React, { Component } from "react";
import './style.css'
/*

The user inputs a country
The program finds the bounding box for that country
and displays the cities with the highest population within that bounding box
This method does not work : bounding box includes other countries as well

*/
export default class FetchCityPopsForCountry extends Component {

    
    cities =  [{name : '',population : ''},{name : '',population : ''},{name : '',population : ''}]
    state = {
        beforeSearch : true,
        showLoading: false,
        country: '',
        countryInput: '',
        north : '',
        south :'',
        east : '',
        west : '',
       
    };
    
    handleOnChange = event => {
        this.setState({ countryInput: event.target.value });
    };
    handleSearch = () => {
        this.setState({ showLoading: true ,beforeSearch : false});
        this.makeApiCountryCall(this.state.countryInput);
    };
    async makeApiCountryCall(input) {
        const url = "http://api.geonames.org/countryInfoJSON?username=weknowit";
        const response = await fetch(url);
        const data = await response.json();
        let entryIndex = data.geonames.findIndex(entry => entry.countryName.toUpperCase() === input.toUpperCase());
        this.setState({ country: data.geonames[entryIndex], north :  data.geonames[entryIndex].north,
            south :  data.geonames[entryIndex].south, east :  data.geonames[entryIndex].east, west :  data.geonames[entryIndex].west});
        this.makeApiCityCall();
        
    }

    async makeApiCityCall(){
        let north = this.state.north;
        let south = this.state.south;
        let east = this.state.east;
        let west = this.state.west;
        const url = "http://api.geonames.org/citiesJSON?north=" + north +"&south="+south+"&east="+east+"&west="+west+"&lang=en&username=weknowit";
        const response = await fetch(url);
        const data = await response.json();
        /*this.state.cities.forEach(function(item,index) {return this.setState({ name : data.geonames[index].name, population : data.geonames[index].population});})*/
        this.cities.forEach(function(item,index) {return item.name = data.geonames[index].name,item.population = data.geonames[index].population })
        this.setState({ showLoading: false });

    }


    render() {
        return (<div className="center">
            <h1>Search by country</h1>
            <input name="text" type="text" placeholder="Search" onChange={event => this.handleOnChange(event)} value={this.state.countryInput} />
            <button onClick={this.handleSearch}>Search</button>
            {this.state.showLoading && !this.state.beforeSearch ? (<div> loading
            </div>) : (<div>
                <div>Country : {this.state.country.countryName}</div>
                <div>City : {this.cities[0].name}</div>
                <div>Population : {this.cities[0].population}</div>
                <div>City : {this.cities[1].name}</div>
                <div>Population : {this.cities[1].population}</div>
                <div>City : {this.cities[2].name}</div>
                <div>Population : {this.cities[2].population}</div>
                
                {this.cities.forEach(function(item,index){ return(
                    <div>
                <div>City : {item.name}</div>
                <div>Population : {item.population}</div>
                </div>)})
                }
                
            </div>)}
        </div>);
    }
}