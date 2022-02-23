import React from "react";
import PropTypes from "prop-types";

import SwipeableViews from "react-swipeable-views";
import CityForecastPage from "./CityForecastPage";
import { useReadMyCities } from "../../../hooks/useReadMyCities";
import CityPageHeader from "./Header/CityPageHeader";

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
    <>
      <CityPageHeader/>
      
       <SwipeableViews enableMouseEvents  index={1}> 
         
          {citiesComponents()}
        
       </SwipeableViews> 
    </>
  );
};

AllCitiesWrapper.propTypes = {
    currentLocationInfo:PropTypes.object.isRequired,
    startOn:PropTypes.number
};

export default AllCitiesWrapper;
