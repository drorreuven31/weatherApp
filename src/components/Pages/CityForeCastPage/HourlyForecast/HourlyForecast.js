import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './scss/HourlyForecast.scss'
import HourData from './HourData'

import { useHorizontalScroll } from '../../../../hooks/useHorizontalScroll'
import MainInfoBox from '../MainInfoBox'
import { calcLocalTime, getLeftRightTextMargin, unixToDateTime } from '../../../../services/util'

import dateFormat from 'dateformat'
import _ from 'lodash'
import { ReactComponent as SunrizeIcon } from '../../../../resources/icons/sunrise.svg';
import { ReactComponent as SunsetIcon } from '../../../../resources/icons/sunset.svg';

import Hour from '@mui/icons-material/QueryBuilder';
import keywords from '../../../../services/redux/translationTexts'
import { useSelector } from 'react-redux'

const HourlyForecast = ({ current, hourly,daily,timezone_offset }) => {
  const scrollRef = useHorizontalScroll()
  const [hoursObjects,sethoursObjects] = useState(hourly);
  const lang = useSelector((state) => state.settings.lang )

  const sunStateObjects=()=>{

    let dt = Date.now()/1000;
    let relevant_sunrise_day = dt > current.sunrise ? 1 : 0
    let relevant_sunset_day = dt > current.sunset ? 1 : 0
   
    const sunrize = 
    {
      dt:daily[relevant_sunrise_day].sunrise,
      hour:dateFormat(unixToDateTime(calcLocalTime(daily[relevant_sunrise_day].sunrise,timezone_offset)),"HH:MM"),
      icon:<SunrizeIcon className='weathersvgIcon'/>,
      temp:'Sunrise',
      isSunState:true
    }
      
    const sunset = 
    {
      dt:daily[relevant_sunset_day].sunset,
      hour:dateFormat(unixToDateTime(calcLocalTime(daily[relevant_sunset_day].sunset,timezone_offset)),"HH:MM"),
      icon:<SunsetIcon className='weathersvgIcon'/>,
      temp:'Sunset',
      isSunState:true
    }
    return([sunrize,sunset]);
    
  }

const CreateObjectsList =()=>{
  let hours=hoursObjects.concat(sunStateObjects());

  hours.sort((a, b) => a.dt-b.dt);
 
  return hours;
}

  const hourComponents=()=>{
   return CreateObjectsList()
    .map((h, index) => {
      return (
        
        !h.isSunState?
        <HourData
          key={h.dt}
          hour={
            index !== 0
              ? unixToDateTime(calcLocalTime(h.dt,timezone_offset)).getHours().toString()
              : 'Now'
          }
          temp={Math.round(h.temp)+""}
          icon={h.weather[0].icon}
        />:
        <HourData
          key={h.dt}
          hour={
            h.hour
          }
          temp={h.temp}
          icon={h.icon}
          isSunState={true}
        />
      )
    })
  }

  


  return (hoursObjects)&&(
    <div className='HourlyForecast'>
      <MainInfoBox
        boxDescription={
          <>
          <Hour style={getLeftRightTextMargin(lang,'.3rem')}/>
          <h6>
            {keywords['hourly_forecast'][lang.id]}
          </h6>
          </>
        }
      >
        <div className='houres_container' ref={scrollRef}>
          {hourComponents()}
        </div>
      </MainInfoBox>
    </div>
  )
}

HourlyForecast.propTypes = {
  current: PropTypes.object.isRequired,
  hourly: PropTypes.array.isRequired,
  daily: PropTypes.array.isRequired,
  timezone_offset:PropTypes.number.isRequired,
}
//
export default HourlyForecast
