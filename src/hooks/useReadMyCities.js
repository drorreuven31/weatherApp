import { useEffect, useState } from "react";
import cookie from "react-cookies";

export function useReadMyCities() {

    const [myCitiesInfo, setmyCitiesInfo] = useState([]);
    useEffect(() => {
        // const cities=[
        //     {name: 'Holon', lat: 32.0193121, lon: 34.7804076, country: 'IL'},
        //     {name: 'Herzeliya', lat: 32.165621, lon: 34.837173, country: 'IL'}
        // ]

        // cookie.save('my_cities',cities,{path:'/'});
        setmyCitiesInfo(readMyCities());
    }, [])
      
    const readMyCities = () => {
     return cookie.load("my_cities");
    };

    return myCitiesInfo;

}

