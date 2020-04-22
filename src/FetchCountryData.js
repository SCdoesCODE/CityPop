import React, { Component } from "react";
import './style.css'

export default class FetchCountryData extends Component {
    state = {
        showLoading: false,
        loading: true,
        country: '',
        countryInput: ''
    };
    
    handleOnChange = event => {
        this.setState({ countryInput: event.target.value });
    };
    handleSearch = () => {
        this.setState({ showLoading: true });
        this.makeApiCall(this.state.countryInput);
    };
    async makeApiCall(input) {
        const url = "http://api.geonames.org/countryInfoJSON?username=weknowit";
        const response = await fetch(url);
        const data = await response.json();
        let entryIndex = data.geonames.findIndex(entry => entry.countryName.toUpperCase() === input.toUpperCase());
        this.setState({ country: data.geonames[entryIndex], loading: false });
        this.setState({ showLoading: false });
    }
    render() {
        return (<div className="center">
            <h1>Search by country</h1>
            <input name="text" type="text" placeholder="Search" onChange={event => this.handleOnChange(event)} value={this.state.countryInput} />
            <button onClick={this.handleSearch}>Search</button>
            {this.state.showLoading ? (<div> loading
            </div>) : (<div>
                <div>Country : {this.state.country.countryName}</div>
                <div>Population : {this.state.country.population}</div>
            </div>)}
        </div>);
    }
}

