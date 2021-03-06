// This is a wrapper component for main info box (full size)

import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import './scss/MainInfoBox.scss'
import useTheme from '../../../hooks/useTheme'


const MainInfoBox = (props) => {
  const {bgOpacity} = useTheme();
  return (
    <div className='info_box' style={{backgroundColor:bgOpacity}}>
      <div className='box_description'>{props.boxDescription}</div>
      <hr className='divider' />
      {props.children}
    </div>
  )
}

MainInfoBox.propTypes = {
 boxDescription:PropTypes.object.isRequired
}

export default MainInfoBox;