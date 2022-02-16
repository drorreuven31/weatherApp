import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './scss/HourlyForecast.scss'
import HourData from './HourData'

import { useHorizontalScroll } from '../../../../hooks/useHorizontalScroll'
import MainInfoBox from '../MainInfoBox'
import { unixToDateTime } from '../../../../services/util'

const HourlyForecast = ({ current, hourly,daily }) => {
  const scrollRef = useHorizontalScroll()
  const [hoursList, sethoursList] = useState(hourly);
  //add sunrize and sunset
  useEffect(() => {
    if(hoursList && daily && current){

    let relevant_day = Date.now() > current.sunset ? 0 : 1
    const sunrizeObject = {
      dt: daily[relevant_day].sunrise,
      hour: unixToDateTime(daily[relevant_day].sunrise),
      icon: 'src/resources/icons/sunrise.svg',
      temp: 'Sunrise',
      isSunState: true,
    }
    const sunsetObject = {
      dt: daily[relevant_day].sunset,
      hour: unixToDateTime(daily[relevant_day].sunrise),
      icon: 'src/resources/icons/sunset.svg',
      temp: 'Sunset',
      isSunState: true,
    }
    sethoursList([...hoursList, sunrizeObject, sunsetObject]) 
  }}, [current, hourly,daily])

  return (current && hourly&& daily)&&(
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
          {hoursList
            .sort((x) => x.dt)
            .map((h, index) => {
              return (
                <HourData
                  key={h.dt}
                  hour={
                    index !== 0
                      ? unixToDateTime(h.dt).getHours().toString()
                      : 'Now'
                  }
                  temp={Math.round(h.temp)}
                  icon={h.weather[0].icon}//problem here
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
  daily: PropTypes.array.isRequired,
}
//
export default HourlyForecast
