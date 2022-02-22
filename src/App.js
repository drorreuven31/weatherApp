import "./App.scss";
import { BrowserRouter, Route, Routes , useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CityForecastPage from './components/Pages/CityForeCastPage/CityForecastPage';
import {getCityNamebyCords} from "./services/locationAPI";
import SwipeableViews from "react-swipeable-views";
import AllCitiesWrapper from "./components/Pages/CityForeCastPage/AllCitiesWrapper";
import { useReadMyCities } from "./hooks/useReadMyCities";

//gets a method to update the current location state


function App() {
  const [currentLocation, setCurrentLocation] = useState();
 
  useEffect(() => {
    async function UpdateLocation(setToDefault = false) {
      if (setToDefault) await UpdateUsersLocation(true);
      //set to default - Holon
      else 
        await UpdateUsersLocation();
    }
    UpdateLocation(!("geolocation" in navigator));

  }, []);

  const UpdateUsersLocation = async (
    setToDefault = false
  ) => {
    const HolonCoords=[32.0193121, 34.7804076];
  
  
    if (setToDefault) {
      
      setCurrentLocation(await getCityNamebyCords(...HolonCoords));
      return;
    }
  
    // for real location
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const locationinfo = await getCityNamebyCords(lat, lon);
      
      setCurrentLocation(locationinfo);
    
    },(err)=>{
      setCurrentLocation( getCityNamebyCords(...HolonCoords));
    });
    
  };

  return (
    <div className="App">
     
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element= {<>{currentLocation&&<AllCitiesWrapper currentLocationInfo={currentLocation}/>}</>}
          />
          <Route path="/forecast/:city" element={<City/>} />
          <Route path="/myCities" element={<MyCities/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}






function City(){
  let { city } = useParams();

  return (
    <div style={{backgroundColor:'red'}}>
      <h3>City: {city}</h3>
    </div>
  );
}
function MyCities(){
  const citiies = useReadMyCities();

  return (
    <div >
      {citiies.map(c=>{
        return <h1 key={c.lat}>{c.name}</h1>
      })}
    </div>
  );
}



export default App;
