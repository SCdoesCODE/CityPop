import React from 'react'
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
            <button>Search by country</button>
            <button>Search by city</button>
            </BrowserRouter>
        </div>
        
    )
}

