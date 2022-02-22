import * as React from "react";

import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import DropDownButton from "../..//DropDownButton";
export default function MoreButton() {
  /*
  const dispatch = useDispatch()

  const lang = useSelector((state) => state.lang.value)

  function changeLanguage(lang) {
      dispatch(changeLang(lang));
  }
*/
  return (
    <DropDownButton className="more-btn"
    icon={<MoreHorizTwoToneIcon/>}
    onClick={()=>{}}
    selected={'c'}
    options={temps}
    />
  );
}

const temps = [{id:"c",name:"Celsius"}, {id:"f",name:"Farenhite"}];
