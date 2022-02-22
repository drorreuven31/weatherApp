import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LanguageIcon from "@mui/icons-material/Language";
import IconButton from "@mui/material/IconButton";
import {useDispatch } from 'react-redux'
import { changeLang } from "../../../../services/redux/langSlice";
export default function LangButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function changeLanguage(lang) {
      dispatch(changeLang(lang));
    handleClose();
  }

  return (
    <div>
      <IconButton
        className="icon"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
          {langs.map(l=>{
              return <MenuItem key={l.id} onClick={()=>changeLanguage(l.id)}>{l.name}</MenuItem>
          })}
       
      </Menu>
    </div>
  );
}

const langs = [{id:"en",name:"English"}, {id:"he",name:"Hebrew"}];
