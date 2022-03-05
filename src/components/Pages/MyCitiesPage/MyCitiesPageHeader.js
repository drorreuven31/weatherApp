import React, { useRef, useState } from "react";
import "./scss/MyCitiesPageHeader.scss";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { Cancel, SearchOutlined } from "@mui/icons-material";
import MoreButton from "./MoreButton";
import { getCitysInfoByName } from "../../../services/locationAPI";
const MyCitiesPageHeader = ({
  setsearchResults,
  searchBarFocusedState: { searchBarFocused, setsearchBarFocused },
  searchBarTextState: { searchBarText, setsearchBarText },
}) => {
  const clearButton = useRef();
  const searchInput = useRef();

  const searchTextChanged = async (e) => {
    let val = e.target.value;
    setsearchBarText(val);
    const res = await getCitysInfoByName(val);
    setsearchResults(res);
  };




  return (
    <header className="my-cities-header">
      <div className="my-cities-header-content">
        {!searchBarFocused && (
          <>
            <div className="more-btn">
              <MoreButton />
            </div>
            <h2 className="weather-text">Weather</h2>
          </>
        )}

        <div className="search-bar-line-container">
          <div className="search-bar-container">
            <SearchOutlined />
            <input
              type="text"
              value={searchBarText}
              onChange={(e) => searchTextChanged(e)}
              onFocus={() => setsearchBarFocused(true)}
              placeholder="Search city"
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
              Cancel
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
