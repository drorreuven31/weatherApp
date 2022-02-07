
import './scss/CityForecastPage.scss';
import PropTypes  from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getLocationWeatherInfo } from "../../../services/weatherAPI";
import CurrentTemperatureData from './CurrentTemperatureData';


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



  return <div className='page'>
      Hey, This is the Forecast for {name}
      {forecast && <CurrentTemperatureData cityName={name} lat={lat} lon={lon} forecast={forecast} />}
  </div>;
};




CityForecastPage.propTypes ={
    cityinfo:PropTypes.object.isRequired 
}

export default CityForecastPage;
