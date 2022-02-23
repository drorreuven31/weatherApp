import { useEffect, useState } from "react";
import cookie from "react-cookies";
import { useSelector,useDispatch } from "react-redux";
import { getCityNamebyCords } from "../services/locationAPI";
import { setCities } from "../services/redux/citiesListSlice";


export function useReadMyCities() {
    const dispath = useDispatch()
    //const [myCitiesInfo, setmyCitiesInfo] = useState([]);
    const cities = useSelector(state=>state.cities.list)
    const [currentLocation, setCurrentLocation] = useState();
    //on mount , if the cities list state is empty bring it from the cookies
    useEffect(() => {
        async function setCities(){
            const cookie_cities =[await getUserLocation()];
            cookie_cities.push(readMyCitiesFromCookies());
            dispath(setCities(cookie_cities));
        }


        if(cities.length===0){
            setCities()
    }
        
        // cookie.save('my_cities',cities,{path:'/'});
         
       
    }, [])
      
    const readMyCitiesFromCookies = () => {
     return cookie.load("my_cities");
    };

    

  const getUserLocation = async () => {
    const HolonCoords=[32.0193121, 34.7804076];
  
  
    if (!("geolocation" in navigator)) {
        const locationinfo = await getCityNamebyCords(...HolonCoords);
        return locationinfo;
    }
    
    // for real location
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const locationinfo = await getCityNamebyCords(lat, lon);
      
      return locationinfo;
    
    });
    
  };





    return cities;

}

