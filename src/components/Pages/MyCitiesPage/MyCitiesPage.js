import "./scss/MyCitiesPage.scss";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useReadMyCities } from "../../../hooks/useReadMyCities";
import { MyCitiesPageHeader } from "./MyCitiesPageHeader";
import CityInspect from "./CityInspect";
import SwipeOptions from "react-swipe-options/SwipeOptions";
import { Delete } from "@mui/icons-material";

const MyCitiesPage = (props) => {
  const citiesInfo = useReadMyCities();

  return (
    <div className="page-wrapper">
      <MyCitiesPageHeader />

      <div className="MyCitiesPage">
        {citiesInfo && (
          <div className="city-inspect-list">
            {citiesInfo.map((c) => {
              return (
                <SwipeOptions left={[<Delete />]}>
                  <CityInspect key={c.lat} {...c} />
                </SwipeOptions>
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
