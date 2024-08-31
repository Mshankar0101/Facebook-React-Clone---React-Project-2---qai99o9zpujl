import React, { useContext } from 'react'
import { GlobalContext } from './contexts/Contexts'
import '../styles/MenuPage.css';
import { FaSearch, FaMoon } from "react-icons/fa";
import { IoArrowBackOutline, IoLogOut } from "react-icons/io5";
import { RiSettings5Fill} from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import profile from '../components/images/profile.jpg';
import { IoMdHelpCircle } from "react-icons/io";
import Switch from '@mui/material/Switch';

const Menu = () => {
    const {darkMode,setDarkMode, user} = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleThemeChange = (event)=>{
        setDarkMode(event.target.checked);
        localStorage.setItem("fbDarkmode",event.target.checked);

    }
    const logoutUser = ()=>{
        localStorage.removeItem('user');
        localStorage.removeItem('signUpUser');
        navigate('/login-signup');
    }

  return (
    <>
    <div className={darkMode?'dark-header-style dark-text menu-heading':'menu-heading'}>
        <div>
            <IoArrowBackOutline onClick={()=>navigate(-1)}  className='back-icon'/>
            <span>Menu</span>
        </div>
        <div>
            <FaSearch className='search-icon' />
        </div>
    </div>
    <div className={darkMode?'dark-parent dark-text menu-page':'menu-page'} >
         <div onClick={()=> navigate('/profile')} className={darkMode?'dark-background dark-text view-profile': 'view-profile'}>
                <div>
                    <img src={profile} alt='profile'/>
                </div>
                <div>
                    <span>{user.name}</span>
                    <p>View your profile</p>
                </div>
         </div>
         <div className='menu-options'>
                <div onClick={()=>navigate('/pages')}>
                    <div className='icon icon1'></div>
                    <p onClick={()=>navigate('/pages')} >Pages</p>
                </div>
        
                <div onClick={()=>navigate('/friends')}>
                    <div className='icon icon2'></div>
                    <p onClick={()=>navigate('/friends')} >Friends</p>
                </div>

                <div onClick={()=>navigate('/marketplace')}>
                    <div className='icon icon3'></div>
                    <p onClick={()=>navigate('/marketplace')} >Marketplace</p>
                </div>

                <div  onClick={()=>navigate('/groups')}>
                    <div className='icon icon4'></div>
                    <p onClick={()=>navigate('/groups')} >Groups</p>
                </div>

                <div  onClick={()=>navigate('/video')}>
                    <div className="icon icon5"></div>
                    <p onClick={()=>navigate('/video')} >Vedio</p>
                </div>

                  <div style={{cursor:'not-allowed'}}>
                      <div className="icon icon6"></div>
                      <p >Saved</p>
                  </div>
                  <div style={{cursor:'not-allowed'}}>
                      <div className="icon icon7"></div>
                      <p >Memories</p>
                  </div>
                  <div style={{cursor:'not-allowed'}}>
                      <div className="icon8"></div>
                      <p >Ads Manager</p>
                  </div>
                  <div style={{cursor:'not-allowed'}}>
                      <div className="icon9"></div>
                      <p >Climate Science</p>
                  </div>
                  <div style={{cursor:'not-allowed'}}>
                      <div className="icon10"></div>
                      <p >Events</p>
                  </div>
                  <div style={{cursor:'not-allowed'}}>
                      <div className="icon11"></div>
                      <p >Facebook Pay</p>
                  </div>
                  <div style={{cursor:'not-allowed'}}>
                      <div className="icon12"></div>
                      <p >Feeds</p>
                  </div>
         </div>
         <div style={{marginTop:'10px'}} className={darkMode?'dark-background setting':'setting'}>
            <RiSettings5Fill className='menu-icon'/>
            <span>Setting & privacy</span>
         </div>
         <div style={{justifyContent:'space-between',cursor:'pointer'}} className={darkMode?'dark-background dark-mode':'dark-mode'}>
             <div>
                <FaMoon className='menu-icon'/>
                 <span>Dark mode</span>
             </div>
             <Switch
                checked={darkMode}
                onChange={handleThemeChange}
                inputProps={{ 'aria-label': 'controlled' }}
             />
         </div>
         <div className={darkMode?'dark-background help-support':'help-support'}>
            <IoMdHelpCircle className='menu-icon'/>
            <span>Help & support</span>
         </div>
         <div onClick={logoutUser} style={{backgroundColor:'unset',boxShadow:'unset', cursor:'pointer', borderTop:'1px solid rgb(181, 184, 187)'}} className='logout'>
            <IoLogOut className='menu-icon'/>
             <span>Log out</span>
         </div>
    </div>
    </>
  )
}

export default Menu