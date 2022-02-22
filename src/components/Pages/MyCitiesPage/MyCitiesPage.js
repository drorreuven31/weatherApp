import './scss/MyCitiesPage.scss'
import React from 'react'
import PropTypes from 'prop-types'
import { useReadMyCities } from '../../../hooks/useReadMyCities';
import { MyCitiesPageHeader } from './MyCitiesPageHeader';

const MyCitiesPage = props => {
    const citiies = useReadMyCities();
  return (
      <div className="page-wrapper">
        <MyCitiesPageHeader/>

    <div className='MyCitiesPage'>
        
        <div className="">Citieslist</div>
        
        </div>
      </div>
  )
}

MyCitiesPage.propTypes = {}

export default MyCitiesPage