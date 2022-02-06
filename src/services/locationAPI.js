import { OPEN_WEATHER_API_KEY } from "./keys";
import axios from "axios";
const GEO_CODING_BASEURL =
  "http://api.openweathermap.org/geo/1.0";


const LocationAxios = axios.create({
  baseURL: GEO_CODING_BASEURL,
  timeout: 5000,
  params: { appid: OPEN_WEATHER_API_KEY },
});







//-----------------REVERSE---------------------------//

// gets geo coordinates and returns city information
export async function getCityNamebyCords(lat, lon) {
  let url = `/reverse?lat=${lat}&lon=${lon}&limit=1`;
  const res = await LocationAxios.get(url);
  return res.data[0];
}
