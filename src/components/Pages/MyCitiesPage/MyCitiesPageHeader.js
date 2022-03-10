import React, { useRef, useState } from "react";
import "./scss/MyCitiesPageHeader.scss";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { Cancel, SearchOutlined } from "@mui/icons-material";
import MoreButton from "./MoreButton";
import { getCitysInfoByName } from "../../../services/locationAPI";
import { useSelector } from "react-redux";
import keywords from "../../../services/translationTexts";
import { getLeftRightTextMargin } from "../../../services/util";
const MyCitiesPageHeader = ({
  setsearchResults,
  searchBarFocusedState: { searchBarFocused, setsearchBarFocused },
  searchBarTextState: { searchBarText, setsearchBarText },
}) => {
  const clearButton = useRef();
  const searchInput = useRef();
  const lang = useSelector((state) => state.settings.lang )

  const searchTextChanged = async (e) => {
    let val = e.target.value;
    setsearchBarText(val);
    const res = await getCitysInfoByName(val,lang.id);
    setsearchResults(res);
  };




  return (
    <header className="my-cities-header">
      <div className={`my-cities-header-content ${lang.direction}-div`}>
        {!searchBarFocused && (
          <>
            <div className="more-btn">
              <MoreButton />
            </div>
            <h2 className="weather-text">{keywords['weather'][lang.id]}</h2>
          </>
        )}

        <div className="search-bar-line-container">
          <div className="search-bar-container">
            <SearchOutlined style={getLeftRightTextMargin(lang,'.5rem')}/>
            <input 
              type="text"
              value={searchBarText}
              onChange={(e) => searchTextChanged(e)}
              onFocus={() => setsearchBarFocused(true)}
              placeholder={keywords['search_city'][lang.id]}
              ref={searchInput}
            />
            {searchBarText!==""&&
            <IconButton
              className="clear-btn"
              ref={clearButton}
              onClick={() => {
                setsearchBarText("");
              }}
            >
              <Cancel />
            </IconButton>
            }
          </div>
          {searchBarFocused && (
            <button
              className="cancel-btn"
              onClick={() => {
                setsearchBarFocused(false);
                setsearchBarText('')
              }}
            >
              {keywords['cancel'][lang.id]}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
MyCitiesPageHeader.propTypes = {
  setsearchResults: PropTypes.func.isRequired,
  searchBarFocusedState: PropTypes.object.isRequired,
  searchBarTextState: PropTypes.object.isRequired,
};

export default MyCitiesPageHeader;
