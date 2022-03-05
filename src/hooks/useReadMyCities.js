import { useEffect, useState } from "react";
import cookie from "react-cookies";
import { useSelector,useDispatch } from "react-redux";
import { getCityNamebyCords } from "../services/locationAPI";
import { setCities } from "../services/redux/citiesListSlice";


export function useReadMyCities() {
    const dispath = useDispatch()
    const [currentLocation, setCurrentLocation] = useState([]);
    const cities = useSelector(state=>state.cities.list)
    

     // setting up te currentLocation
     useEffect(() => {
       
      setUserLocation();
    }, [])
    

    //on mount , if the cities list state is empty bring it from the cookies
    useEffect(() => {
      
        async function asyncSetCities(){
          if(currentLocation.length!==0){
           
            let loc = await getCityNamebyCords(...currentLocation)
            loc.isMyLocation=true;
            let cities =[loc];
            let cookie_cities=readMyCitiesFromCookies();
            debugger;
            if(cookie_cities!==null)
              cities=cities.concat(cookie_cities);
              
           // debugger;
            dispath(setCities(cities));
          }
        }
       
          if(cities.length===0&&currentLocation.length>0){
            asyncSetCities()
          }
    
        
       
         
       
    }, [currentLocation])
      
   


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



  let filtered = cities.filter(function (el) {
    return el != null;
  });
  return filtered;
}

