import "./App.scss";
import { BrowserRouter, Route, Routes , useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CityForecastPage from './components/Pages/CityForeCastPage/CityForecastPage';
import {getCityNamebyCords} from "./services/locationAPI";
import SwipeableViews from "react-swipeable-views";
import AllCitiesWrapper from "./components/Pages/CityForeCastPage/AllCitiesWrapper";
import { useReadMyCities } from "./hooks/useReadMyCities";
import MyCitiesPage from "./components/Pages/MyCitiesPage/MyCitiesPage";

//gets a method to update the current location state


function App() {
  

  return (
    <div className="App">
     
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element= {<AllCitiesWrapper startOn={0}/>}
          />
        
          <Route path="/myCities" element={<MyCitiesPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
