import { useEffect, useState } from "react";
import cookie from "react-cookies";
import { useSelector,useDispatch } from "react-redux";
import { setCities } from "../services/redux/citiesListSlice";


export function useReadMyCities() {
    const dispath = useDispatch()
    //const [myCitiesInfo, setmyCitiesInfo] = useState([]);
    const cities = useSelector(state=>state.cities.list)
    //on mount , if the cities list state is empty bring it from the cookies
    useEffect(() => {
        if(cities.length===0){
        const cookie_cities =readMyCitiesFromCookies()
        dispath(setCities(cookie_cities));
    }
        // const cities=[
        //     {name: 'Holon', lat: 32.0193121, lon: 34.7804076, country: 'IL',local_names:{en: 'Holon', he: 'חולון',}},
        //     {name: 'Herzeliya', lat: 32.165621, lon: 34.837173, country: 'IL',local_names:{en: 'Herzeliya', he: 'הרצליה',}}
        // ]

        // cookie.save('my_cities',cities,{path:'/'});
         
       
    }, [])
      
    const readMyCitiesFromCookies = () => {
     return cookie.load("my_cities");
    };

    return cities;

}

