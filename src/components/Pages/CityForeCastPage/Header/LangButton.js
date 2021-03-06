import * as React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import IconButton from "@mui/material/IconButton";
import {useDispatch,useSelector } from 'react-redux'
import { changeLang } from "../../../../services/redux/settingsSlice";
import DropDownButton from '../../../../components/DropDownButton'
export default function LangButton() {
  
  const dispatch = useDispatch()

  const lang = useSelector((state) => state.settings.lang)

  function changeLanguage(lang) {
      dispatch(changeLang(langs.filter(x=>x.id==lang)[0]));
  }

  return (
    <DropDownButton className='icon'
    icon={<LanguageIcon/>}
    onClick={changeLanguage}
    selected={lang.id}
    options={langs}
    />
  );
}

const langs = [{id:"en",name:"English",direction:'ltr',dir:'left'}, {id:"he",name:"Hebrew",direction:'rtl',dir:'right'}];
