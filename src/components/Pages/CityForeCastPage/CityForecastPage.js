import './scss/CityForecastPage.scss'
import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
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
import CityPageHeader from './Header/CityPageHeader'
import { useSelector } from 'react-redux'
import { getThemeData, getWeatherTime } from '../../../services/themes'
import { ThemeContext } from './AllCitiesWrapper'
import keywords from '../../../services/translationTexts'
import { getLeftRightTextMargin } from '../../../services/util'


export const CurrentTempertureContext = React.createContext();


const CityForecastPage = ({ cityinfo,cityIndex ,currentIndex}) => {
  const { name, local_names, lat, lon} = cityinfo

  const [forecast, setForecast] = useState(null)
  const columnNumber = useColumCalculator()
  const lang = useSelector((state) => state.settings.lang )
  const temp = useSelector((state) => state.settings.temp )
  const {setTheme} = useContext(ThemeContext);

  
  async function fetchWeatherInfo() {
    const _forcast = await getLocationWeatherInfo(lat, lon,temp,lang.id);
    setForecast(_forcast);
    console.log('forecast updated!')
   }

   //for updating on props change
  useEffect(() => {
    if (lat && lon)
     fetchWeatherInfo().catch()
  }, [lat, lon,lang,temp])
  
  //for updating every 5 minute
  useEffect(() => {
    const refreshInterval = setInterval(() => {
     
      fetchWeatherInfo().catch();
    },300*1000);
  
    return () => {
      clearInterval(refreshInterval);
    }
  }, [])
  
  //for updating theme
  useEffect(() => {
    if(forecast){
    if(currentIndex==cityIndex)
      setTheme({theme:forecast.current.weather[0].main,time:getWeatherTime(forecast.current.weather[0].icon)});
    }

  }, [currentIndex,cityIndex,forecast])
  
  



  const createSmallDataBoxes = () => [
    <SmallInfoBox boxDescription={<><AirIcon style={getLeftRightTextMargin(lang,'.3rem')}/> <h6>{keywords['wind'][lang.id]}</h6></>} key={1}>
      {Math.round(forecast.current.wind_speed*(temp=="f"?1:3.6))} {keywords['speedUnit'][temp][lang.id]}
    </SmallInfoBox>,
    <SmallInfoBox boxDescription={<><TempIcon style={getLeftRightTextMargin(lang,'.3rem')}/> <h6>{keywords['feels_like'][lang.id]}</h6></>} key={2}>
      {Math.round(forecast.current.feels_like)}°
    </SmallInfoBox>,
    <SmallInfoBox boxDescription={<><UvIcon style={getLeftRightTextMargin(lang,'.3rem')}/> <h6>{keywords['uv_index'][lang.id]}</h6></>} key={3}>
      {forecast.current.uvi}
    </SmallInfoBox>,
    <SmallInfoBox boxDescription={<><VisibilityIcon style={getLeftRightTextMargin(lang,'.3rem')}/> <h6>{keywords['visibility'][lang.id]}</h6></>} key={4}>
      {Math.round(forecast.current.visibility / 1000)} {keywords['km'][lang.id]}
    </SmallInfoBox>,
    <SmallInfoBox boxDescription={<><HumidityIcon style={getLeftRightTextMargin(lang,'.3rem')}/> <h6>{keywords['humidity'][lang.id]}</h6></>} key={5}>
      {forecast.current.humidity}%
    </SmallInfoBox>,
    <SmallInfoBox boxDescription={<><PressureIcon style={getLeftRightTextMargin(lang,'.3rem')}/> <h6>{keywords['pressure'][lang.id]}</h6></>} key={6}>
    {forecast.current.pressure} {keywords['mb'][lang.id]}
  </SmallInfoBox>,
  ]
  
  const getPageBg=()=>{
    return getThemeData(forecast.current.weather[0].main,getWeatherTime(forecast.current.weather[0].icon)).bgImage;
  }

  return (
    
    <>
      {(forecast&&lang) && (
    <div className={'pagewrapper ' +`${lang.direction}-div`} style={{backgroundImage:`url(${getPageBg()})`}}>
      
        <div className='page'>
          <CurrentTemperatureData
            cityName={local_names[lang.id]}
            lat={lat}
            lon={lon}
            forecast={forecast}
          />
          <HourlyForecast
            current={forecast.current}
            hourly={forecast.hourly.slice(0, 23)}
            daily={forecast.daily}
            timezone_offset={forecast.timezone_offset}
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
    </div>
      )}
    </>
  )
}

CityForecastPage.propTypes = {
  cityinfo: PropTypes.object.isRequired,
  cityIndex:PropTypes.number.isRequired,
  currentIndex:PropTypes.number.isRequired
  
}


function fillChunkedList(list) {
 
  let chunck = list[0].length
  let last = list.length - 1
  if (list[last].length !== chunck) {
    let divsToAdd =list[last].length
    for (let i = 0; i < chunck -divsToAdd ; i++) {
      list[last].push(
        <div
          key={i*1000}
          style={{
            margin: '.5rem',
            padding: '1rem',
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
