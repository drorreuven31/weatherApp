import React from 'react'
import PropTypes from 'prop-types'
import './scss/DayData.scss'

import TempRangeBar from './TempRangeBar'
import { useSelector } from 'react-redux'


const DayData = ({ dayOfWeek, minTemp,maxTemp,icon,isToday}) => {
  
  const lang = useSelector((state) => state.settings.lang )
  return (
   <>
    <div className={`DayData text-${lang.dir}`}>
      <div className='dayName'>{dayOfWeek}</div>
     
        <img
          className='dayweatherIcon'
          src={`https://openweathermap.org/img/wn/${icon}@${4}x.png`}
          alt='icons'
        />
      
      <div className='dayMinTemp'>{minTemp}°</div>
      <TempRangeBar min={minTemp} max={maxTemp} isToday={isToday}/>
      <div className='dayMaxTemp'>{maxTemp}°</div>
    </div>
    <hr className='divider'/>
    </>
  )
}

DayData.propTypes = {
  dayOfWeek:PropTypes.string.isRequired,
  minTemp: PropTypes.number.isRequired,
  maxTemp: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  isToday:PropTypes.bool.isRequired
}

export default DayData