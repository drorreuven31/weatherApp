import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./scss/CityInspect.scss";
import { getLocationWeatherInfo } from "../../../services/weatherAPI";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";
import { unixToDateTime } from "../../../services/util";
import SwipeOptions from "react-swipe-options/SwipeOptions";

const CityInspect = ({ lat, lon, local_names }) => {
  const [forecast, setforecast] = useState();

  const lang = useSelector((state) => state.settings.lang);
  useEffect(() => {
    async function fetchForecast() {
      setforecast(await getLocationWeatherInfo(lat, lon));
    }
    if (lat && lon) fetchForecast();
  }, [lat, lon]);


  return (
    <>
    {forecast&&(

    <div className="CityInspect">
      <div className="left-section">
        <h4 className="city-name">{local_names[lang]}</h4>
        <div className="city-time">{dateFormat(unixToDateTime(forecast.current.dt),"HH:MM")}</div>
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
};

export default CityInspect;



 