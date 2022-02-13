// This is a wrapper component for main info box (full size)

import React from 'react'
import PropTypes from 'prop-types'

import './scss/MainInfoBox.scss'
const MainInfoBox = (props) => {
  return (
    <div className='info_box'>
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