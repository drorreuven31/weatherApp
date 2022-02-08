//The Top Square with basic data : name , temp , short description.
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./scss/CurrentTemperatureData.scss";

import { UpperCaseFirstLettersSentence } from "../../../services/util";

const CurrentTemperatureData = ({ cityName, lat, lon,forecast }) => {
  
  return (
    <>
      {forecast ? (
        <div className="CurrentTemperatureData">
          <div>
            <h1 className="cityname">{cityName}</h1>
            <div className="temperture">
              {Math.round(forecast.current.temp)}°
            </div>
            <h3 className="short_desctiption">
              {UpperCaseFirstLettersSentence(
                forecast.current.weather[0].description
              )}
            </h3>
          </div>

          <div className="min_max_tempertures">
            <div className="min">Min: {Math.round(forecast.daily[0].temp.min)}°</div>
            <div className="max">Max: {Math.round(forecast.daily[0].temp.max)}°</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

CurrentTemperatureData.propTypes = {
  cityName: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  forecast:PropTypes.object.isRequired
};

export default CurrentTemperatureData;
