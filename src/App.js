import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import CityForecastPage from "./components/Pages/CityForecastPage";
import {getCityNamebyCords} from "./services/locationAPI";

//gets a method to update the current location state
const UpdateUsersLocation = async (
  setCurrentLocation,
  setToDefault = false
) => {
  if (setToDefault) {
    const HolonInfo = await getCityNamebyCords(32.0193121, 34.7804076);
    setCurrentLocation(HolonInfo);
    return;
  }
  // for real location
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const locationinfo = await getCityNamebyCords(lat, lon);
    setCurrentLocation(locationinfo);
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
          <Route path="/:city" element={<h1>dror</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
