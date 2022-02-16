import React from 'react';
import PropTypes from 'prop-types';
import './scss/SmallInfoBox.scss';
const SmallInfoBox = props => {
  return (
    <div className='small_info_box'>
      <div className='small_box_description'>{props.boxDescription}</div>
      <div className="box_content">
      {props.children}
      </div>
    </div>
  )
}

SmallInfoBox.propTypes = {
  boxDescription: PropTypes.object.isRequired,
}

export default SmallInfoBox