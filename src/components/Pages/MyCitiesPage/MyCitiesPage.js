import "./scss/MyCitiesPage.scss";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useReadMyCities } from "../../../hooks/useReadMyCities";
import MyCitiesPageHeader from "./MyCitiesPageHeader";
import CityInspect from "./CityInspect";
import { Delete ,SearchOutlined} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCity } from "../../../services/redux/citiesListSlice";
import {useCookies} from "react-cookie";

const MyCitiesPage = (props) => {
  const citiesInfo = useReadMyCities();
  const navigate = useNavigate();
  const [searchResults, setsearchResults] = useState([]);
  const [searchBarFocused, setsearchBarFocused] = useState(false);
  const [searchBarText, setsearchBarText] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['my_cities']);

  const dispath = useDispatch();

  const handleAddCity = (cityinfo) => {
  
    //update the cookies
    let cookies_cities = citiesInfo.map((a) => Object.assign({}, a));
    cookies_cities = cookies_cities.filter((x) => !x.isMyLocation);
    cookies_cities.push(cityinfo);
    console.log('set cookie to:' )
    console.log(cookies_cities )
    try{
    setCookie('my_cities',cookies_cities,{ path: '/' })
    }
    catch{
      console.log('shit')
    }
    dispath(addCity(cityinfo));
    setsearchBarText("");
    setsearchBarFocused(false);
  };

  return (
    <div
      className="CitiesPage-page-wrapper"
      style={{
        height: searchBarText !== "" && searchBarFocused ? "100%" : "100%",
      }}
    >
      <MyCitiesPageHeader
        setsearchResults={setsearchResults}
        searchBarFocusedState={{ searchBarFocused, setsearchBarFocused }}
        searchBarTextState={{ searchBarText, setsearchBarText }}
      />

      <div className="MyCitiesPage">
        {searchBarText !== "" && searchBarFocused ? (
          <>
            {searchResults.length > 0 ? (
              <div className="search-result-list">
                {searchResults.map((res) => {
                  let name = res.local_names["en"];
                  let bold = name.slice(0, searchBarText.length);
                  let regular = name.slice(searchBarText.length, name.length);
                  return (
                    <div
                      className="search-result-item"
                      key={res.lat}
                      onClick={() => handleAddCity(res)}
                    >
                      <span className="bold">{bold}</span>
                      <span>
                        {regular} , {res.country}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-results">
                <SearchOutlined/>
                 <h2>No Results</h2>
              <h5>No results found for "{searchBarText}".</h5>
              </div>
            )}
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

MyCitiesPage.propTypes = {};

export default MyCitiesPage;
