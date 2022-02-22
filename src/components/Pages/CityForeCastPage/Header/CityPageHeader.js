import React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";

import ListIcon from "@mui/icons-material/List";
import "./CityPageHeader.scss";
import LangButton from "./LangButton";
import { Link } from "react-router-dom";
const CityPageHeader = (props) => {
  return (
    
      <header>
          <div className="header-content">
         
        <IconButton className="icon"
          component={Link} to={'/myCities'}
        >
          <ListIcon />
        </IconButton>

        <LangButton  />
        </div>
      </header>
    
  );
};

CityPageHeader.propTypes = {};

export default CityPageHeader;
