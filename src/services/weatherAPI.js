import { OPEN_WEATHER_API_KEY } from "./keys";
import axios from "axios";
import { Buffer } from 'buffer'
const ONE_CALL_BASEURL =
  "https://api.openweathermap.org/data/2.5";


const WeatherAxios = axios.create({
  baseURL: ONE_CALL_BASEURL,
  timeout: 5000,
  params: { appid: OPEN_WEATHER_API_KEY },
});


export  async function getLocationWeatherInfo(lat, lon,temp,lang) {

    let units=temp=='f'?'imperial':'metric';
    let url = `onecall?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&exclude=${'minutely,alerts'}`;
    const res = await WeatherAxios.get(url);
    return res.data;
  }





