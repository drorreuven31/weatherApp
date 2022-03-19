import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getCityNamebyCords } from "../services/locationAPI";
import { setCities } from "../services/redux/citiesListSlice";
import {useCookies} from "react-cookie";

export function useReadMyCities() {
    const dispath = useDispatch()
    const [currentLocation, setCurrentLocation] = useState([]);
    const cities = useSelector(state=>state.cities.list)
    const [cookies, setCookie, removeCookie] = useCookies(['my_cities']);

     // setting up te currentLocation
     useEffect(() => {
      if(currentLocation.length===0)
        setUserLocation();
    }, [])
    
    //on mount , if the cities list state is empty bring it from the cookies
    useEffect(() => {
      
        async function asyncSetCities(){
          if(currentLocation.length!==0){
           
            let loc = await getCityNamebyCords(...currentLocation)
            loc.isMyLocation=true;
            let cities =[loc];
         
          
            if(cookies.my_cities!==null){
              
              cities=cities.concat(cookies.my_cities);
            }
          
            dispath(setCities(cities));
          }
        }
       
          if(cities.length===0&&currentLocation.length>0){
            asyncSetCities()
          }
    
    }, [currentLocation,cookies])
      
   


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
    
    },
    ()=>{
      alert("hey")
      fetch("https://ipinfo.io/geo").then(res=>{
        alert(res)
        var loc = res.loc.split(',');
        var coords = {
            latitude: loc[0],
            longitude: loc[1]
        };
        setCurrentLocation([coords.latitude,coords.longitude])
      })
    }
    )
    }
  }



  let filtered = cities.filter(function (el) {
    return el != null;
  });
  return filtered;
}

