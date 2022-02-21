import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { WeekMinMaxTempContext } from './SevenDaysForecast'
import { tempToColor } from 'temp-color';
import './scss/TempRangeBar.scss'

const TempRangeBar = ({min,max}) => {
    const WeekMinMaxTemp = useContext(WeekMinMaxTempContext);
    const calcGradientStyle = ()=>{
        let weekRange =(WeekMinMaxTemp.maxTemp-WeekMinMaxTemp.minTemp);
        let width=  (((max-min) / weekRange)* 100) +"%";
        let marginLeft = (((min-WeekMinMaxTemp.minTemp)/weekRange)*100)+"%"
       
        let min_color =tempToColor(min,WeekMinMaxTemp.minTemp*0.8,WeekMinMaxTemp.maxTemp*1.2,);
        let max_color =tempToColor(max,WeekMinMaxTemp.minTemp*0.8,WeekMinMaxTemp.maxTemp*1.2);
        
        

        let backgroundImage = `linear-gradient(to right, rgb(${min_color.r},${min_color.g},${min_color.b}) , rgb(${max_color.r},${max_color.g},${max_color.b}))`


        return {width,marginLeft,backgroundImage};
    }
  return <div className='TempRangeBar'>
      
      <div className="bar" >
          <div className="gradient" style={calcGradientStyle()}></div>
      </div>
  </div>;
};

TempRangeBar.propTypes = {
    min:PropTypes.number.isRequired,
    max:PropTypes.number.isRequired
};

export default TempRangeBar;
