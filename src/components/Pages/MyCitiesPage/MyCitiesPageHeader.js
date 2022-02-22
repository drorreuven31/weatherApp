import React from 'react'
import './scss/MyCitiesPageHeader.scss'
import { styled, alpha } from '@mui/material/styles';

import { IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import MoreButton from './MoreButton';
export const MyCitiesPageHeader = () => {

  return (
        <header className='my-cities-header'>
        <div className="my-cities-header-content">
            <div className="more-btn"><MoreButton /></div>
        
         
        <h2 className="weather-text">Weather</h2>
        <div className="search-bar-container">
                    <SearchOutlined />
                    <input type="text" placeholder="Search city" />
                </div>
       
            </div>
        </header>
  )
}
