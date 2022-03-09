//The Top Square with basic data : name , temp , short description.
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./scss/CurrentTemperatureData.scss";

import { getLeftRightTextMargin, UpperCaseFirstLettersSentence } from "../../../services/util";
import keywords from "../../../services/redux/translationTexts";
import LangButton from "./Header/LangButton";
import { useSelector } from "react-redux";

const CurrentTemperatureData = ({ cityName, lat, lon,forecast }) => {
  const lang = useSelector((state) => state.settings.lang )

 
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
            <div className="min" style={getLeftRightTextMargin(lang,'1rem')}>{keywords['min'][lang.id]}: {Math.round(forecast.daily[0].temp.min)}°</div>
            <div className="max">{keywords['max'][lang.id]}: {Math.round(forecast.daily[0].temp.max)}°</div>
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
