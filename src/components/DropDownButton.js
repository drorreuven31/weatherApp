import  React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LanguageIcon from "@mui/icons-material/Language";
import IconButton from "@mui/material/IconButton";
import { Check } from "@mui/icons-material";
import PropTypes from 'prop-types'

const DropDownButton = props => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };



  return (
    <div>
      <IconButton
        className={props.className}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {props.icon}
      </IconButton>
      <Menu
      style={{zIndex:'10000'}}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
          {props.options.map(opt=>{
              return(
              <MenuItem 
              key={opt.id} 
              onClick={()=>{
                  props.onClick(opt.id)
                  handleClose()
                }}
              selected={opt.id===props.selected}
              
              >
                {(opt.id===props.selected)&&<Check/>}
                {opt.name}
                </MenuItem>)
          })}
       
      </Menu>
    </div>
  )
}

DropDownButton.propTypes = {
icon:PropTypes.object.isRequired,
onClick:PropTypes.func.isRequired,
selected:PropTypes.string.isRequired,
options:PropTypes.array.isRequired,
className:PropTypes.string
}

export default DropDownButton;