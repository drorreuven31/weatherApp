import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./scss/HourData.scss";
import propTypes from "prop-types";

const HourData = ({ hour, temp, icon, isSunState }) => {
  return (
    <div className="hour_item">
      <div className="hour">{hour}</div>
        
      {isSunState
      ?
      <div className="weatherIcon">
        {icon}  
      </div>
      :
      <img
        className="weatherIcon"
        src={`https://openweathermap.org/img/wn/${icon}@${4}x.png`}
      />
      }
      <div className="temp">
        {temp}
        {!isSunState && "°"}
      </div>
    </div>
  );
};

HourData.propTypes = {
  temp: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  isSunState: PropTypes.bool,
};

export default HourData;
