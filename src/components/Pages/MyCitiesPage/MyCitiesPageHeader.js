import React, { useRef } from 'react'
import './scss/MyCitiesPageHeader.scss'
import { styled, alpha } from '@mui/material/styles';

import { IconButton } from '@mui/material';
import { Cancel, SearchOutlined } from '@mui/icons-material';
import MoreButton from './MoreButton';
export const MyCitiesPageHeader = () => {
    const cancelButton = useRef();
    const searchInput = useRef();

    const searchTextChanged =(e)=>{
        if(e.target.value!="")
            cancelButton.current.style.display='inline-flex'
        else
            cancelButton.current.style.display='none'

        console.log(cancelButton.current.style)
    }

  return (
        <header className='my-cities-header'>
        <div className="my-cities-header-content">
            <div className="more-btn"><MoreButton /></div>
        
         
        <h2 className="weather-text">Weather</h2>
        <div className="search-bar-container">
                    <SearchOutlined />
                    <input type="text" onChange={searchTextChanged} placeholder="Search city" ref={searchInput}/>
                    <IconButton className='cancel-btn'
                     ref={cancelButton} 
                     onClick={()=>{
                         searchInput.current.value=''
                         cancelButton.current.style.display='none'
                     }}> 
               
                    <Cancel/>
                    </IconButton>
                </div>
       
            </div>
        </header>
  )
}
//style={{display:'none'}}