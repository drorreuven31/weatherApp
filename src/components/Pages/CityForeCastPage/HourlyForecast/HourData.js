import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './scss/HourData.scss';
import propTypes from 'prop-types';


const HourData = ({hour,temp,icon}) => {
 
  return (
    <div className='hour_item'>
      <div className='hour'>{hour}</div>
      <img className='weatherIcon' src={`https://openweathermap.org/img/wn/${icon}@${4}x.png`} alt='icons' />
      <div className='temp'>{temp}°</div>
    </div>
  )
};

HourData.propTypes = {
 temp:PropTypes.number.isRequired,
 hour:PropTypes.number.isRequired,
 icon:PropTypes.string.isRequired,
};

export default HourData;
