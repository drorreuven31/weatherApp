import React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";

import ListIcon from "@mui/icons-material/List";
import "./CityPageHeader.scss";
import LangButton from "./LangButton";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import NavigationIcon from '@mui/icons-material/Navigation';
const CityPageHeader = (props) => {
  return (
    <header>
      <div className="header-content">
        <IconButton className="icon" component={Link} to={"/myCities"}>
          <ListIcon />
        </IconButton>
      <div className="tabs">
          
         {Array(props.locationsNumber).fill(0).map((_, i) => {
           return(
           <IconButton key={i+1} value={i+1} className={i==props.index?'selected-tab':''} onClick={()=>props.changeIndex(i)}>
             {i==0? 
             <NavigationIcon sx={{fontSize:'1rem'}}/>
             :
             <FiberManualRecordIcon sx={{fontSize:'1rem'}} />
             }
           </IconButton>)
           

         })}
         
       
        </div>
        <LangButton />
      </div>
    </header>
  );
};

CityPageHeader.propTypes = {
  locationsNumber:PropTypes.number.isRequired,
  index:PropTypes.number.isRequired,
  changeIndex:PropTypes.func.isRequired
};

export default CityPageHeader;
