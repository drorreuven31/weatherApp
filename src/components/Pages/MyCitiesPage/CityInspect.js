import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./scss/CityInspect.scss";
import { getLocationWeatherInfo } from "../../../services/weatherAPI";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";
import { calcLocalTime, oppositeDirection, unixToDateTime } from "../../../services/util";
import { getThemeData, getWeatherTime } from "../../../services/themes";
import keywords from "../../../services/translationTexts";


const CityInspect = ({ lat, lon, local_names,isMyLocation,onClick }) => {
  const [forecast, setforecast] = useState();

  const lang = useSelector((state) => state.settings.lang);
  const temp = useSelector((state) => state.settings.temp);

  useEffect(() => {
    async function fetchForecast() {
      setforecast(await getLocationWeatherInfo(lat, lon,temp,lang.id));
    }
   
    if (lat && lon) fetchForecast();

  }, [lat, lon,lang,temp]);

  const getPageBg=()=>{
    const bgImage= getThemeData(forecast.current.weather[0].main,getWeatherTime(forecast.current.weather[0].icon)).bgImage;
    return bgImage;
  }

  return (
    <>
    {forecast&&(

    <div className={"CityInspect"+` ${lang.direction}-div`} onClick={onClick} style={{backgroundImage:`url(${getPageBg()})`}}>
      <div className={`left-section text-${lang.dir}`}>
        <h4 className="city-name">{
          isMyLocation?keywords['my_location'][lang.id]:local_names[lang.id]
        }</h4>
        <div className="city-time">{
          isMyLocation
          ?
          local_names[lang.id]
          :
          dateFormat(unixToDateTime(calcLocalTime(forecast.current.dt,forecast.timezone_offset)),"HH:MM")
        
        }</div>
        <div className="weather-description">{forecast.current.weather[0].description}</div>
      </div>
      
      <div className={`right-section text-${lang.dir}`}>
        <div className={`current-temp text-${oppositeDirection(lang.dir)}`}>{ Math.round(forecast.current.temp)}°</div>
        <div className="min-max-container">{
            `${keywords['min'][lang.id]}: ${Math.round(forecast.daily[0].temp.min)}°  ${keywords['max'][lang.id]}: ${Math.round(forecast.daily[0].temp.max)}°`
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



 