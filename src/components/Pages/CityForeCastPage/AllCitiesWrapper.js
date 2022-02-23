import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import SwipeableViews from "react-swipeable-views";
import CityForecastPage from "./CityForecastPage";
import { useReadMyCities } from "../../../hooks/useReadMyCities";
import CityPageHeader from "./Header/CityPageHeader";

const AllCitiesWrapper = (props) => {
  const citiesInfo = useReadMyCities();
  const [cityIndex, setcityIndex] = useState(props.startOn)
  

  useEffect(() => {
    setcityIndex(props.startOn);
}, [props.startOn])


const citiesComponents =()=>{
   
    let allCities =[ ];
    
    if(citiesInfo){
    const cities =citiesInfo.map((city,i)=>{
        return(
          <CityForecastPage cityinfo={city} key={i}/>
        )
    })
    allCities= allCities.concat(cities);
}

return allCities;
}

  return (
    <>
      <CityPageHeader locationsNumber={citiesInfo.length} index={cityIndex} changeIndex={setcityIndex}/>
      
       <SwipeableViews enableMouseEvents  index={cityIndex} onChangeIndex={setcityIndex}> 
         
          {citiesComponents()}
        
       </SwipeableViews> 
    </>
  );
};

AllCitiesWrapper.propTypes = {
    startOn:PropTypes.number
};

export default AllCitiesWrapper;
