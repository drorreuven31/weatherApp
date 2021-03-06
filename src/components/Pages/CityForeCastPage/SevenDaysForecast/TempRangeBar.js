import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { WeekMinMaxTempContext } from './SevenDaysForecast'
import { CurrentTempertureContext } from '../CityForecastPage';
import { useSelector } from "react-redux";

import { tempToColor } from 'temp-color';
import './scss/TempRangeBar.scss'
import useWindowSize from '../../../../hooks/useWindowSize';
import { oppositeDirection } from '../../../../services/util';

const TempRangeBar = ({min,max,isToday}) => {
    const WeekMinMaxTemp = useContext(WeekMinMaxTempContext);
    const CurrentTempurture = useContext(CurrentTempertureContext);

    const gradientContainer = useRef(null);
    const dot = useRef(null);
    const windowSize = useWindowSize();
    const lang = useSelector((state) => state.settings.lang ) 
    const margin_dir=lang.dir.charAt(0).toUpperCase()+lang.dir.slice(1,lang.dir.length);

    useEffect(() => {
       if(dot.current)
            dot.current.style[`margin${margin_dir}`] =calcDotStyle()
   
    }, [windowSize])
    
    const calcDotStyle=()=>{
      
        let dotHeight = gradientContainer.current.clientHeight;
        let gradientWidth = gradientContainer.current.clientWidth;

        let roundedTemp= Math.round(CurrentTempurture.temp);
        let margin = ((((roundedTemp-min)/(max-min))*100)-(dotHeight*100/gradientWidth))
        if(margin<0)
            margin=0

        return margin+"%";
    }



    const calcGradientStyle = ()=>{
        let weekRange =(WeekMinMaxTemp.maxTemp-WeekMinMaxTemp.minTemp);
        let width=  (((max-min) / weekRange)* 100) +"%";
        let margin = (((min-WeekMinMaxTemp.minTemp)/weekRange)*100)+"%"
       
        let min_color =tempToColor(min,WeekMinMaxTemp.minTemp*0.8,WeekMinMaxTemp.maxTemp*1.2,);
        let max_color =tempToColor(max,WeekMinMaxTemp.minTemp*0.8,WeekMinMaxTemp.maxTemp*1.2);
       
        let backgroundImage = `linear-gradient(to ${oppositeDirection(lang.dir)}, rgb(${min_color.r},${min_color.g},${min_color.b}) , rgb(${max_color.r},${max_color.g},${max_color.b}))`
        
       
        let styles={width,
            [`margin${margin_dir}`]:margin,
            backgroundImage}

        return styles;
    }
    
    
  return <div className='TempRangeBar'>
      
      <div className="bar" >
          <div className="gradient" style={calcGradientStyle()} ref={gradientContainer}>
              {isToday && <div className="dot" ref={dot}></div>}
         
          </div>
      </div>
  </div>;
};

TempRangeBar.propTypes = {
    min:PropTypes.number.isRequired,
    max:PropTypes.number.isRequired,
    isToday:PropTypes.bool
};

export default TempRangeBar;
