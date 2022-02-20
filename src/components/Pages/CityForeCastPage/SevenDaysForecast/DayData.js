import React from 'react'
import PropTypes from 'prop-types'
import './scss/DayData.scss'


const DayData = ({ dayOfWeek, minTemp,maxTemp,icon }) => {
  return (
   <>
    <div className='DayData'>
      <div className='dayName'>{dayOfWeek}</div>
      <div className='dayIcon'>
        <img
          className='dayweatherIcon'
          src={`https://openweathermap.org/img/wn/${icon}@${4}x.png`}
          alt='icons'
        />
      </div>
      <div className='dayMinTemp'>{minTemp}°</div>
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
}

export default DayData