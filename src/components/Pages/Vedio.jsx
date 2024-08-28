import React, { useContext } from 'react'
import { GlobalContext } from '../contexts/Contexts';
import '../../styles/UpcomingPages.css';
import { RiSettings5Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import {TextField, InputAdornment} from '@mui/material';

const Vedio = () => {
  const {darkMode}=useContext(GlobalContext);
  return (
    <div className={darkMode?'dark-parent dark-text upcoming-pages' : 'upcoming-pages'}>
        <div className={darkMode?'dark-header-style side-bar':'side-bar'}>
            <div className='name-setting-search'>
              <div>
                   <h1>Video</h1>
                   <div className={darkMode?'dark-background round-div-upcoming-page':'round-div-upcoming-page'}>
                      <RiSettings5Fill className='icons-upcoming-page' />
                   </div>
              </div>
              <div className='search'>
                 <TextField
                  id="input-with-icon-textfield"
                  placeholder='Search Videos'
                  // disabled
                  sx={{
                      width: '100%',
                      ".MuiOutlinedInput-notchedOutline":{
                          border: 'none'
                      },
                      "& .MuiInputBase-root":{
                          height: '36px',
                          backgroundColor:(darkMode?'rgb(50,52,54)':'#e0e4eb'),
                          borderRadius:'20px',
                          color: (darkMode?'#fff':'#000'),
                          
                      },
                  }}
                  InputProps={{
                  readOnly: true,
                  type:'search',
                  startAdornment: (
                      <InputAdornment position="start">
                      <FaSearch color='#65676b' />
                      </InputAdornment>
                  ),
                  }}
                  variant="outlined"
                />
              </div>

            </div>
            <div className='options'>
                 <div>
                     <div className='icon-div' >
                      <div className='icons vedio-icon1'></div>
                     </div>
                     <p>Home</p>
                 </div>
                 <div>
                     <div className='icon-div' >
                      <div className='icons vedio-icon2'></div>
                     </div>
                     <p>Live</p>
                 </div>
                 <div>
                     <div className='icon-div' >
                      <div className='icons vedio-icon3'></div>
                     </div>
                     <p>Reels</p>
                 </div>
                 <div>
                     <div className='icon-div' >
                      <div className='icons vedio-icon4'></div>
                     </div>
                     <p>Shows</p>
                 </div>
                 <div>
                     <div className='icon-div' >
                      <div className='icons vedio-icon5'></div>
                     </div>
                     <p>Explore</p>
                 </div>
                 <div>
                     <div className='icon-div' >
                      <div className='icons vedio-icon6'></div>
                     </div>
                     <p>Saved Videos</p>
                 </div>
            </div>
            <div className={darkMode?'dark-background dark-text create':'create'}>
               <p style={{color:'rgb(56, 88, 152)'}}>+ Create new Video</p>
            </div>
        </div>
        <div className='content'>
               <p>This page is coming soon!</p>
        </div>
    </div>
  )
}

export default Vedio