import React from 'react'
import FetchCountryData from './FetchCountryData';
import { Link , BrowserRouter} from 'react-router-dom';



export default function ChooseScope() {
    return (
        /*
        <div>
            <BrowserRouter>
            CityPop
            <Link to="/FetchCountryData">Search by country</Link>
            <button>Search by city</button>
            </BrowserRouter>
        </div>
        */

        
        <div>
            <BrowserRouter>
            CityPop
            <Link to="/FetchCountryData"><a href="./FetchCountryData">Search by country</a></Link>
            <button>Search by city</button>
            </BrowserRouter>
        </div>
        
    )
}

