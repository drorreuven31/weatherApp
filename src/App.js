import "./App.scss";
import { BrowserRouter, Route, Routes , useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CityForecastPage from './components/Pages/CityForeCastPage/CityForecastPage';
import {getCityNamebyCords} from "./services/locationAPI";

//gets a method to update the current location state
const UpdateUsersLocation = async (
  setCurrentLocation,
  setToDefault = false
) => {

const HolonInfo = await getCityNamebyCords(32.0193121, 34.7804076);

  if (setToDefault) {
    setCurrentLocation(HolonInfo);
    return;
  }

  // for real location
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const locationinfo = await getCityNamebyCords(lat, lon);
    setCurrentLocation(locationinfo);
  
  },(err)=>{
    setCurrentLocation(HolonInfo);
  });
  
};

function App() {
  const [currentLocation, setCurrentLocation] = useState({});

  useEffect(() => {
    async function UpdateLocation(setToDefault = false) {
      if (setToDefault) await UpdateUsersLocation(setCurrentLocation, true);
      //set to default - Holon
      else 
        await UpdateUsersLocation(setCurrentLocation);
  
      
    }
   
    UpdateLocation(!("geolocation" in navigator));

    return () => {};
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<CityForecastPage cityinfo={currentLocation} />}
          />
          <Route path="/forecast/:city" element={<City/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function City(){
  let { city } = useParams();

  return (
    <div>
      <h3>City: {city}</h3>
    </div>
  );
}



export default App;
