import { useEffect, useState } from "react";
import cookie from "react-cookies";
import { useSelector,useDispatch } from "react-redux";
import { getCityNamebyCords } from "../services/locationAPI";
import { setCities } from "../services/redux/citiesListSlice";


export function useReadMyCities() {
    const dispath = useDispatch()
    const [currentLocation, setCurrentLocation] = useState([]);
    const cities = useSelector(state=>state.cities.list)
    
    //on mount , if the cities list state is empty bring it from the cookies
    useEffect(() => {
        async function asyncSetCities(){
          if(currentLocation.length!==0){
            let loc = await getCityNamebyCords(...currentLocation)
            loc.isMyLocation=true;
            let cookie_cities =[loc,{name:"Milano",lat:45.477576, lon:9.233362,local_names:{en:"Milano",he:'מילאנו'}}];
            cookie_cities=cookie_cities.concat(readMyCitiesFromCookies());
           // debugger;
            dispath(setCities(cookie_cities));
          }
        }
       
          if(cities.length===0&&currentLocation.length>0){
            asyncSetCities()
          }
    
        
        // cookie.save('my_cities',cities,{path:'/'});
         
       
    }, [currentLocation])
      
    // setting up te currentLocation
    useEffect(() => {
      setUserLocation();
    }, [])
    


    const readMyCitiesFromCookies = () => {
     return cookie.load("my_cities");
    };

    

  const setUserLocation = () => {
    const HolonCoords=[32.0193121, 34.7804076];
  
  
    if (!("geolocation" in navigator)) {
        setCurrentLocation(HolonCoords)
    }
    else{

    // for real location
    navigator.geolocation.getCurrentPosition( position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setCurrentLocation([lat,lon])
    
    })
    }
  }




    return cities;

}

