import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./scss/CityInspect.scss";
import { getLocationWeatherInfo } from "../../../services/weatherAPI";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";
import { unixToDateTime } from "../../../services/util";
import { getThemeData, getWeatherTime } from "../../../services/themes";


const CityInspect = ({ lat, lon, local_names,isMyLocation,onClick }) => {
  const [forecast, setforecast] = useState();
console.log(forecast)


  const lang = useSelector((state) => state.settings.lang);

  useEffect(() => {
    async function fetchForecast() {
      setforecast(await getLocationWeatherInfo(lat, lon));
    }
    if (lat && lon) fetchForecast();
  }, [lat, lon]);

  const getPageBg=()=>{
    const bgImage= getThemeData(forecast.current.weather[0].main,getWeatherTime(forecast.current.weather[0].icon)).bgImage;
    return bgImage;
  }

  function calcLocalTime(){
    let offset=new Date().getTimezoneOffset()*60
    const time = forecast.current.dt+forecast.timezone_offset+offset
    return time;
  }

  return (
    <>
    {forecast&&(

    <div className="CityInspect" onClick={onClick} style={{backgroundImage:`url(${getPageBg()})`}}>
      <div className="left-section">
        <h4 className="city-name">{
          isMyLocation?'My Location':local_names[lang]
        }</h4>
        <div className="city-time">{
          isMyLocation
          ?
          local_names[lang]
          :
          dateFormat(unixToDateTime(calcLocalTime()),"HH:MM")
        
        }</div>
        <div className="weather-description">{forecast.current.weather[0].description}</div>
      </div>
      
      <div className="right-section">
        <div className="current-temp">{ Math.round(forecast.current.temp)}°</div>
        <div className="min-max-container">{
            `Min: ${Math.round(forecast.daily[0].temp.min)}°  Max: ${Math.round(forecast.daily[0].temp.max)}°`
        }</div>
      </div>
    </div>
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
};

export default CityInspect;



 