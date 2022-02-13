import React from 'react';
import PropTypes from 'prop-types';
import './scss/HourlyForecast.scss'
import HourData from './HourData';

import { useHorizontalScroll } from '../../../../hooks/useHorizontalScroll'
import MainInfoBox from '../MainInfoBox';
import { unixToDateTime } from '../../../../services/util';



const HourlyForecast =({current,hourly})=> {
  
const scrollRef = useHorizontalScroll()

  return (
    <div className='HourlyForecast'>
      <MainInfoBox
        boxDescription={
          <h6>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
            maxime ullam
          </h6>
        }
      >
        <div className='houres_container' ref={scrollRef}>
          {hourly.map((h, index) => {
            return (
              <HourData
                key={h.dt}
                hour={
                  index !== 0
                    ? unixToDateTime(h.dt).getHours().toString()
                    : 'Now'
                }
                temp={Math.round(h.temp)}
                icon={h.weather[0].icon}
              />
            )
          })}
        </div>
      </MainInfoBox>
    </div>
  )
}

HourlyForecast.propTypes = {
  current: PropTypes.object.isRequired,
  hourly: PropTypes.array.isRequired,
}
//
export default HourlyForecast;


