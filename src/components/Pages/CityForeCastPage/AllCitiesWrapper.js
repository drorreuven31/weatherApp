import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import SwipeableViews from "react-swipeable-views";
import CityForecastPage from "./CityForecastPage";
import { useReadMyCities } from "../../../hooks/useReadMyCities";
import CityPageHeader from "./Header/CityPageHeader";
import { useSelector } from "react-redux";

export const ThemeContext = createContext({
  theme: {},
  setTheme: (theme) => {}
});


const AllCitiesWrapper = (props) => {
  const citiesInfo = useReadMyCities();
  //debugger;
  const [currentCityIndex, setcurrentCityIndex] = useState(props.startOn)
  const [theme, setTheme] = useState({theme:'Clear',time:"day"})
  const lang = useSelector((state) => state.settings.lang )
  useEffect(() => {
    setcurrentCityIndex(props.startOn);
}, [props.startOn])


const citiesComponents =()=>{
  let cities=[]
    if(citiesInfo){
     cities =citiesInfo.map((city,i)=>{
        return(
          <CityForecastPage cityinfo={city} cityIndex={i} currentIndex={currentCityIndex} key={i}/>
        )
    })
   
}

return cities;
}

  return (
    <>
    {citiesInfo&&(<ThemeContext.Provider value={{theme,setTheme}}>
      <CityPageHeader locationsNumber={citiesInfo.length} index={currentCityIndex} changeIndex={setcurrentCityIndex}/>
      
       <SwipeableViews enableMouseEvents  index={currentCityIndex} onChangeIndex={setcurrentCityIndex} axis={lang.direction==='ltr'?'x':'x-reverse'}> 
         
          {citiesComponents()}
        
       </SwipeableViews> 
       </ThemeContext.Provider>)}
       </>
    
  );
};

AllCitiesWrapper.propTypes = {
    startOn:PropTypes.number
};

export default AllCitiesWrapper;
