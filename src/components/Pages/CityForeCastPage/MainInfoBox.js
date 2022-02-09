// This is a wrapper component for main info box (full size)

import React from 'react'
import PropTypes from 'prop-types'

import './scss/MainInfoBox.scss'
const MainInfoBox = (props) => {
  return (
    <div className='info_box'>
      <h6 className='box_description'>{props.boxDescription}</h6>
      <hr className='divider' />
      {props.children}
    </div>
  )
}

MainInfoBox.propTypes = {
 boxDescription:PropTypes.string.isRequired
}

export default MainInfoBox;