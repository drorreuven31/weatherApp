import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./scss/CityInspect.scss";
import { getLocationWeatherInfo } from "../../../services/weatherAPI";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";
import { calcLocalTime, oppositeDirection, unixToDateTime } from "../../../services/util";
import { getThemeData, getWeatherTime } from "../../../services/themes";
import keywords from "../../../services/translationTexts";


import SwipeToDelete from "../../SwipeToDelete/SwipeToDelete";
import { Delete } from "@mui/icons-material";
const CityInspect = ({ lat, lon, local_names,isMyLocation,onClick,onDelete }) => {
  const [forecast, setforecast] = useState();
  const [currentTime, setcurrentTime] = useState(new Date())
  const lang = useSelector((state) => state.settings.lang);
  const temp = useSelector((state) => state.settings.temp);

  useEffect(() => {
    async function fetchForecast() {
      setforecast(await getLocationWeatherInfo(lat, lon,temp,lang.id));
    }
   
    if (lat && lon) fetchForecast();

  }, [lat, lon,lang,temp]);

  useEffect(() => {
    const timer = setInterval(() => { // Creates an interval which will update the current data every minute
    // This will trigger a rerender every component that uses the useDate hook.
    setcurrentTime(new Date());
  }, 60 * 1000);
  return () => {
    clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
  }
}, []);
  


  const getPageBg=()=>{
    const bgImage= getThemeData(forecast.current.weather[0].main,getWeatherTime(forecast.current.weather[0].icon)).bgImage;
    return bgImage;
  }

  const swipeContent=()=>(
  <div className={"CityInspect"+` ${lang.direction}-div`} style={{backgroundImage:`url(${getPageBg()})`}}>
  <div className={`left-section text-${lang.dir}`}>
    <h4 className="city-name">{
      isMyLocation?keywords['my_location'][lang.id]:local_names[lang.id]
    }</h4>
    <div className="city-time">{
      isMyLocation
      ?
      local_names[lang.id]
      :
      dateFormat(unixToDateTime(calcLocalTime(Math.floor(currentTime.getTime()/1000),forecast.timezone_offset)),"HH:MM")
    
    }</div>
    <div className="weather-description">{forecast.current.weather[0].description}</div>
  </div>
  
  <div className={`right-section text-${lang.dir}`}>
    <div className={`current-temp text-${oppositeDirection(lang.dir)}`}>{ Math.round(forecast.current.temp)}??</div>
    <div className="min-max-container">{
        `${keywords['min'][lang.id]}: ${Math.round(forecast.daily[0].temp.min)}??  ${keywords['max'][lang.id]}: ${Math.round(forecast.daily[0].temp.max)}??`
    }</div>
  </div>
</div>);


  return (
    <>
    {forecast&&(
      <>
      {!isMyLocation?(
        <SwipeToDelete rtl={lang.direction==="rtl"} onClick={onClick} onDelete={onDelete} deleteComponent={<Delete/>} >
          {swipeContent()}
        </SwipeToDelete>):
        <div onClick={onClick} style={{marginBottom:'.5rem'}}>
          {swipeContent()}
          </div>
      }
     </>
    )}
    </>
  )
};

CityInspect.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  local_names: PropTypes.object.isRequired,
  isMyLocation: PropTypes.bool,
  onClick:PropTypes.func.isRequired,
  onDelete:PropTypes.func
};

export default CityInspect;



 