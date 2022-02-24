import "./scss/MyCitiesPage.scss";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useReadMyCities } from "../../../hooks/useReadMyCities";
import { MyCitiesPageHeader } from "./MyCitiesPageHeader";
import CityInspect from "./CityInspect";
import { Delete } from "@mui/icons-material";
import { useNavigate  } from "react-router-dom";



const MyCitiesPage = (props) => {
  const citiesInfo = useReadMyCities();
    const navigate = useNavigate();
  return (
    <div className="page-wrapper">
      <MyCitiesPageHeader />

      <div className="MyCitiesPage">
        {citiesInfo && (
          <div className="city-inspect-list">
            {citiesInfo.map((c,i) => {
              return (

                  <CityInspect key={c.lat} {...c} onClick={() => navigate(`/city/${i}`)}/>
                
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

MyCitiesPage.propTypes = {};

export default MyCitiesPage;
