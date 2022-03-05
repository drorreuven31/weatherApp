import { OPEN_WEATHER_API_KEY } from "./keys";
import axios from "axios";
const GEO_CODING_BASEURL =
  "http://api.openweathermap.org/geo/1.0";


const LocationAxios = axios.create({
  baseURL: GEO_CODING_BASEURL,
  timeout: 5000,
  params: { appid: OPEN_WEATHER_API_KEY },
});



// gets city name and returns city information
export async function getCitysInfoByName(cityname) {
  if(cityname==="")
    return [];

  let url = `/direct?q=${cityname}&limit=7`;
  const results = await LocationAxios.get(url);
  if(!results.data)
    return []
  
  let filteredResults =results.data.filter(res=>{
   return res.local_names!==undefined?('en' in res.local_names ):false

  })
  
  return filteredResults;
  
}




//-----------------REVERSE---------------------------//

// gets geo coordinates and returns city information
export async function getCityNamebyCords(lat, lon) {
  let url = `/reverse?lat=${lat}&lon=${lon}&limit=1`;
  const res = await LocationAxios.get(url);
  return res.data[0];
}
