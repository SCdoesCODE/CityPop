
import React, { Component } from "react";
import {Link } from "react-router-dom";
import './style.css'


/*

The user chooses between two pages : search by country or search by city

*/

export default class ChooseScope extends Component {


state = {
        
    showScopePage : true
};

hideScopePage = () =>{
    this.setState({ showScopePage : false });
}


render() {
    return (
        <>
        {this.state.showScopePage ? 
            (<div className="center">
            
        <div className = 'citypoptext'>CityPop</div>
        <Link to ='./SearchCity' ><button className = 'button' onClick = {this.hideScopePage} >SEARCH BY CITY</button></Link>
        <Link to ='./SearchCountry' ><button className = 'button' onClick = {this.hideScopePage} >SEARCH BY COUNTRY</button></Link>
    </div>) : null}
    </>
       
        
    )
}

}