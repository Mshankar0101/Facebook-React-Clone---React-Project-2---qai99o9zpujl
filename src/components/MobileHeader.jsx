import React, { useContext } from 'react';
import { GlobalContext } from './contexts/Contexts';
import '../styles/MobileHeader.css';
import '../styles/Header.css';
import { TextField, InputAdornment } from '@mui/material';
import { FaSearch } from "react-icons/fa";
import { TbFlag3 , TbFlag3Filled} from "react-icons/tb";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const MobileHeader = () => {
    const {darkMode}= useContext(GlobalContext);
    const navigate = useNavigate();
    
  return (
    <div className={darkMode?'dark-parent header-mobile ':'header-mobile'}>
          <div className='logo-search-menu'>
                <div>
                    <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yP/r/48MsiA6m666.png'  alt='fb-logo' />
                </div>
                <div>
                   <TextField
                    id="input-with-icon-textfield"
                    placeholder='Search Facebook'
                    onFocus={()=> navigate('/search')}                    
                    sx={{
                        width: {sm: '42px', md: 42},
                        ".MuiOutlinedInput-notchedOutline":{
                            border: 'none'
                        },
                        "& .MuiInputBase-root":{
                            height: '40px',
                            backgroundColor:(darkMode?'rgb(50,52,54)':'#f0f2f5'),
                            borderRadius:'20px',
                            color: (darkMode?'#fff':'#000')
                            
                        },
                    }}
                    InputProps={{
                    type:'search',
                    startAdornment: (
                        <InputAdornment position="start">
                        <FaSearch color='#65676b' onClick={()=> navigate('/search')} />
                        </InputAdornment>
                    ),
                    }}
                    variant="outlined"
                    />
                    <div>
                       <IoMenu />
                    </div>
                </div>
          </div>
          <div className='pages'>

          </div>
    </div>
  )
}

export default MobileHeader