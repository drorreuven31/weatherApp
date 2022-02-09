import React from 'react';
import PropTypes from 'prop-types';
import './scss/HourlyForecast.scss'
//import '../scss/infoboxcss.scss';
import HourData from './HourData';

import { useHorizontalScroll } from '../../../../hooks/useHorizontalScroll'
import MainInfoBox from '../MainInfoBox';



const HourlyForecast =({current,hourly})=> {
  const unixToDateTime=(unix)=>{
    let date = new Date(unix * 1000);
    return date;
  }
const scrollRef = useHorizontalScroll()

  return (
    <MainInfoBox boxDescription=
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi maxime ullam '>
      <div className='houres_container' ref={scrollRef}>
        {hourly.map((h, index) => {
          return (
            <HourData
              key={h.dt}
              hour={index !== 0 ? unixToDateTime(h.dt).getHours() : 'Now'}
              temp={Math.round(h.temp)}
              icon={h.weather[0].icon}
            />
          )
        })}
      </div>
    </MainInfoBox>
  )
}

HourlyForecast.propTypes = {
  current: PropTypes.object.isRequired,
  hourly: PropTypes.array.isRequired,
}
//
export default HourlyForecast;


