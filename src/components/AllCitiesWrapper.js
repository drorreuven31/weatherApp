import React from "react";
import PropTypes from "prop-types";

import SwipeableViews from "react-swipeable-views";
import CityForecastPage from "./Pages/CityForeCastPage/CityForecastPage";
import { useReadMyCities } from "../hooks/useReadMyCities";

const AllCitiesWrapper = (props) => {
  const citiesInfo = useReadMyCities();

const citiesComponents =()=>{
    let allCities =[ <CityForecastPage cityinfo={props.currentLocationInfo} key={0}/> ];
    if(citiesInfo){
    const cities =citiesInfo.map((city,i)=>{
        return(
          <CityForecastPage cityinfo={city} key={i+1}/>
        )
    })
    allCities= allCities.concat(cities);
}
return allCities;
}

  return (
    <div>
      <SwipeableViews enableMouseEvents>
         
          {citiesComponents()}
        
      </SwipeableViews>
    </div>
  );
};

AllCitiesWrapper.propTypes = {
    currentLocationInfo:PropTypes.object.isRequired
};

export default AllCitiesWrapper;
