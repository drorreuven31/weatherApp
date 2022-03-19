import * as React from "react";

import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import DropDownButton from "../..//DropDownButton";
import { useDispatch, useSelector } from "react-redux";
import { changeTemp } from "../../../services/redux/settingsSlice";
export default function MoreButton() {

    const dispatch = useDispatch()

    const temp = useSelector((state) => state.settings.temp)
  
    function changeTempurture(temp) {
        dispatch(changeTemp(temp));
    }
  
  return (
    <DropDownButton className="more-btn"
    icon={<MoreHorizTwoToneIcon/>}
    onClick={changeTempurture}
    selected={temp}
    options={temps}
    />
  );
}

const temps = [{id:"c",name:"Celsius"}, {id:"f",name:"Fahrenheit"}];
