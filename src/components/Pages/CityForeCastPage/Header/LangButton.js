import * as React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import IconButton from "@mui/material/IconButton";
import {useDispatch,useSelector } from 'react-redux'
import { changeLang } from "../../../../services/redux/langSlice";
import DropDownButton from '../../../../components/DropDownButton'
export default function LangButton() {
  
  const dispatch = useDispatch()

  const lang = useSelector((state) => state.lang.value)

  function changeLanguage(lang) {
      dispatch(changeLang(lang));
  }

  return (
    <DropDownButton className='icon'
    icon={<LanguageIcon/>}
    onClick={changeLanguage}
    selected={lang}
    options={langs}
    />
  );
}

const langs = [{id:"en",name:"English"}, {id:"he",name:"Hebrew"}];
