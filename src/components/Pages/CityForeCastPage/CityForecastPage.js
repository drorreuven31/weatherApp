
import './scss/CityForecastPage.scss';
import PropTypes  from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getLocationWeatherInfo } from "../../../services/weatherAPI";
import CurrentTemperatureData from './CurrentTemperatureData';
import HourlyForecast from './HourlyForecast/HourlyForecast';


const CityForecastPage = ({cityinfo}) => {
    const {name, local_names, lat, lon,country,state} =cityinfo

    const [forecast, setForecast] = useState(null);

  useEffect(() => {
    async function fetchWeatherInfo() {
      setForecast(await getLocationWeatherInfo(lat, lon));
      console.log(forecast);
    }
    if(lat && lon)
      fetchWeatherInfo();
      
    return () => {};
  }, [lat, lon]);



  return (
    <div className='page'>
      {forecast && (
        <>
          <CurrentTemperatureData
            cityName={name}
            lat={lat}
            lon={lon}
            forecast={forecast}
          />
          <HourlyForecast
            current={forecast.current}
            hourly={forecast.hourly.slice(0,25)}
          />
        </>
      )}
    </div>
  )
};




CityForecastPage.propTypes ={
    cityinfo:PropTypes.object.isRequired 
}

export default CityForecastPage;
