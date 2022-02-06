//The Top Square with basic data : name , temp , short description.
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./scss/CurrentTemperatureData.scss";

import { UpperCaseFirstLettersSentence } from "../../services/util";

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
            <h2 className="short_desctiption">
              {UpperCaseFirstLettersSentence(
                forecast.current.weather[0].description
              )}
            </h2>
          </div>

          <div className="min_max_tempertures">
            <div className="min">Min: 10°</div>
            <div className="max">Max: 35°</div>
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
