import './scss/CityForecastPage.scss'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { getLocationWeatherInfo } from '../../../services/weatherAPI'
import CurrentTemperatureData from './CurrentTemperatureData'
import HourlyForecast from './HourlyForecast/HourlyForecast'
import SevenDaysForecast from './SevenDaysForecast/SevenDaysForecast'
import SmallInfoBox from './SmallInfoBox'
import useColumCalculator from '../../../hooks/useColumCalculator'
import _ from 'lodash'

//icons
import AirIcon from '@mui/icons-material/Air';
import TempIcon from '@mui/icons-material/Thermostat';
import UvIcon from '@mui/icons-material/LightMode';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HumidityIcon from '@mui/icons-material/Water';
import PressureIcon from '@mui/icons-material/Speed';


export const CurrentTempertureContext = React.createContext();


const CityForecastPage = ({ cityinfo }) => {
  const { name, local_names, lat, lon, country, state } = cityinfo

  const [forecast, setForecast] = useState(null)
  const columnNumber = useColumCalculator()
  

  useEffect(() => {
    async function fetchWeatherInfo() {
      setForecast(await getLocationWeatherInfo(lat, lon))
    }
    if (lat && lon) fetchWeatherInfo()

    return () => {}
  }, [lat, lon])
  
  console.log(forecast)
  
  const createSmallDataBoxes = () => [
    <SmallInfoBox boxDescription={<><AirIcon style={{marginRight:".3rem"}}/> <h6>Wind</h6></>}>
      {forecast.current.wind_speed} Km/h
    </SmallInfoBox>,
    <SmallInfoBox boxDescription={<><TempIcon style={{marginRight:".3rem"}}/> <h6>Feels Like</h6></>}>
      {Math.round(forecast.current.feels_like)}°
    </SmallInfoBox>,
    <SmallInfoBox boxDescription={<><UvIcon style={{marginRight:".3rem"}}/> <h6>UV Index</h6></>}>
      {forecast.current.uvi}
    </SmallInfoBox>,
    <SmallInfoBox boxDescription={<><VisibilityIcon style={{marginRight:".3rem"}}/> <h6>Visibility</h6></>}>
      {Math.round(forecast.current.visibility / 1000)} Km
    </SmallInfoBox>,
    <SmallInfoBox boxDescription={<><HumidityIcon style={{marginRight:".3rem"}}/> <h6>Humidity</h6></>}>
      {forecast.current.humidity}%
    </SmallInfoBox>,
    <SmallInfoBox boxDescription={<><PressureIcon style={{marginRight:".3rem"}}/> <h6>Pressure</h6></>}>
    {forecast.current.pressure} Mb
  </SmallInfoBox>,
  ]

  return (
    <div className='pagewrapper'>
      {forecast && (
        <div className='page'>
          <CurrentTemperatureData
            cityName={name}
            lat={lat}
            lon={lon}
            forecast={forecast}
          />
          <HourlyForecast
            current={forecast.current}
            hourly={forecast.hourly.slice(0, 23)}
            daily={forecast.daily}
          />
          <CurrentTempertureContext.Provider value={forecast.current} >
          <SevenDaysForecast daily={forecast.daily} />
          </CurrentTempertureContext.Provider>
          <div className='smallBoxesContainer'>
            {fillChunkedList(_.chunk(createSmallDataBoxes(), columnNumber)).map(
              (row, i) => {
                return (
                  <div key={i} className='boxesRow'>
                    {row}
                  </div>
                )
              }
            )}
          </div>
        </div>
      )}
    </div>
  )
}

CityForecastPage.propTypes = {
  cityinfo: PropTypes.object.isRequired,
}


function fillChunkedList(list) {
 
  let chunck = list[0].length
  let last = list.length - 1
  if (list[last].length !== chunck) {
    let divsToAdd =list[last].length
    console.log('divs to add: ',divsToAdd)
    for (let i = 0; i < chunck -divsToAdd ; i++) {
      list[last].push(
        <div
          key={i*1000}
          style={{
            margin: '1rem',
            width: '100%',
            aspectRatio: '1/1',
          }}
        />
      )
    }
  }
  return list
}

export default CityForecastPage
