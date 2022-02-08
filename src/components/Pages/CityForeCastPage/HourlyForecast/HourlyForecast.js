import React from 'react';
import PropTypes from 'prop-types';
import './scss/HourlyForecast.scss'
import HourData from './HourData';
import ScrollContainer from 'react-indiana-drag-scroll'




const HourlyForecast =({current,hourly})=> {
  const unixToDateTime=(unix)=>{
    let date = new Date(unix * 1000);
    return date;
  }



  return (
    <div className='HourlyForecast'>
      <h6 className='long_description'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit vdg gsafg gagf
        geagf.
      </h6>
      <hr />

      <div className='houres_container'>
        {hourly.map((h,index) => {
          return (
            <HourData
              key={h.dt}
              hour={index!=0?unixToDateTime(h.dt).getHours():"Now"}
              temp={Math.round(h.temp)}
              icon={h.weather[0].icon}
            />
          )
        })}
      </div>
    </div>
  )
}

HourlyForecast.propTypes = {
  current: PropTypes.object.isRequired,
  hourly: PropTypes.array.isRequired,
}

export default HourlyForecast;


