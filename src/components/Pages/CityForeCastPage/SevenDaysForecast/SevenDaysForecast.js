import React from "react";
import PropTypes from "prop-types";
import MainInfoBox from "../MainInfoBox";
import DayData from "./DayData";
import _ from "lodash";
import { getLeftRightTextMargin, unixToDateTime, weekdays } from "../../../../services/util";

import WeekIcon from "@mui/icons-material/DateRange";
import keywords from "../../../../services/redux/translationTexts";
import { useSelector } from "react-redux";

export const WeekMinMaxTempContext = React.createContext();
const SevenDaysForecast = (props) => {
  const lang = useSelector((state) => state.settings.lang )

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
              <WeekIcon style={getLeftRightTextMargin(lang,'.3rem')} />
              <h6>{keywords['seven_days_forecast'][lang.id]}</h6>
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
                  isToday={index == 0?true:false}
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
