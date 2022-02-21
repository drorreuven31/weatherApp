import React from "react";
import PropTypes from "prop-types";
import MainInfoBox from "../MainInfoBox";
import DayData from "./DayData";
import _ from "lodash";
import { unixToDateTime, weekdays } from "../../../../services/util";

import WeekIcon from "@mui/icons-material/DateRange";


export const WeekMinMaxTempContext = React.createContext();
const SevenDaysForecast = (props) => {

  const createWeekMinMaxTemp =()=>{
    let temps =props.daily.reduce((temparr,day)=>{
        return [...temparr,day.temp.min,day.temp.max]
    },[]);

    let minTemp =Math.min.apply(null,temps);
    let maxTemp =Math.max.apply(null,temps);
    return {
      minTemp,maxTemp
    }
  }

  return (
    <WeekMinMaxTempContext.Provider value={createWeekMinMaxTemp()}>
      <div className="SevenDaysForeCast">
        <MainInfoBox
          boxDescription={
            <>
              <WeekIcon style={{ marginRight: ".3rem" }} />
              <h6>7-DAYS FORECAST</h6>
            </>
          }
        >
          <div className="daysContainer">
            {_.map(props.daily, (_day, index) => {
              return (
                <DayData
                  key={_day.dt}
                  dayOfWeek={
                    index !== 0
                      ? weekdays[unixToDateTime(_day.dt).getDay()]
                      : "Today"
                  }
                  icon={_day.weather[0].icon}
                  minTemp={Math.round(_day.temp.min)}
                  maxTemp={Math.round(_day.temp.max)}
                />
              );
            })}
          </div>
        </MainInfoBox>
      </div>
    </WeekMinMaxTempContext.Provider>
  );
};

SevenDaysForecast.propTypes = {
  daily: PropTypes.array.isRequired,
};

export default SevenDaysForecast;
