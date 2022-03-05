import "./scss/MyCitiesPage.scss";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useReadMyCities } from "../../../hooks/useReadMyCities";
import MyCitiesPageHeader from "./MyCitiesPageHeader";
import CityInspect from "./CityInspect";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCity } from "../../../services/redux/citiesListSlice";
import cookie from "react-cookies";

const MyCitiesPage = (props) => {
  const citiesInfo = useReadMyCities();
  const navigate = useNavigate();
  const [searchResults, setsearchResults] = useState([]);
  const [searchBarFocused, setsearchBarFocused] = useState(false);
  const [searchBarText, setsearchBarText] = useState("");
  const cities = useSelector(state=>state.cities.list)

  const dispath = useDispatch();

  const handleAddCity = (cityinfo)=>{
    debugger;
    //update the cookies
    let cookies_cities = citiesInfo.map(a => Object.assign({}, a));
    cookies_cities = cookies_cities.filter(x=>!x.isMyLocation)
    cookies_cities.push(cityinfo);
    
    cookie.remove('my_cities');
    cookie.save('my_cities',cookies_cities,{path:'/'});

    dispath(addCity(cityinfo));
    setsearchBarText('');
    setsearchBarFocused(false);
  }



  return (
    <div className="page-wrapper">
      <MyCitiesPageHeader
        setsearchResults={setsearchResults}
        searchBarFocusedState={{ searchBarFocused, setsearchBarFocused }}
        searchBarTextState={{searchBarText,setsearchBarText}}
      />

      <div className="MyCitiesPage">
        {(searchBarText!==""&&searchBarFocused) ? (
          <div className="search-result-list">
            
              {searchResults.map((res) => {
                let name = res.local_names["en"];
                let bold = name.slice(0, searchBarText.length);
                let regular = name.slice(searchBarText.length, name.length);
                return (
                  
                    <div className="search-result-item" key={res.lat} onClick={()=>handleAddCity(res) }>
                    <span className="bold">{bold}</span><span>{regular} , {res.country}</span>
                    
                    </div>
                 
                )
              })}
            
          </div>
        ) :(<>
          {citiesInfo && (
            <div
              className="city-inspect-list"
              style={{ opacity: searchBarFocused ? "0.2" : "1" }}
            >
              {citiesInfo.map((c, i) => {
                return (
                  <CityInspect
                    key={c.lat}
                    {...c}
                    onClick={() => navigate(`/city/${i}`)}
                  />
                );
              })}
            </div>
          )}
        </>) }
      </div>
    </div>
  );


  


};

MyCitiesPage.propTypes = {};

export default MyCitiesPage;


