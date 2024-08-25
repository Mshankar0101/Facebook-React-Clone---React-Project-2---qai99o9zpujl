import React, { useContext, useEffect} from 'react'
import '../styles/App.css';
import Header from './Header';
import {Routes, Route, useLocation, Navigate} from 'react-router-dom';
import Home from './Pages/Home';
import MobileHeader from './MobileHeader';
import Pages from './Pages/Pages.jsx';
import Vedio from './Pages/Vedio.jsx';
import MarketPlace from './Pages/MarketPlace.jsx'
import Groups from './Pages/Groups.jsx';
import Friends from './Pages/Friends.jsx';
import { GlobalContext } from './contexts/Contexts';
import LoginSignup from './LoginSignup.jsx';
import Navigator from './Navigator.jsx';


const App = () => {
  const {resolution} = useContext(GlobalContext);
  const location = useLocation();

   // handles changes in localStorage across tabs
   useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'user' && !e.newValue) {
        window.location.href = '/login-signup';
      } 
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);



  return (
    <div className='app'>
      {
        resolution.width < 850 ?
        <MobileHeader/>
        :
        <Header/>
      }

       <div style={{paddingTop:(resolution.width < 850? 'unset':location.pathname==='/login-signup'?'unset':'56px')}}>
          <Routes>

              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path='/login-signup' element={<LoginSignup/>}/>
              <Route path='/home' element={<Navigator><Home/></Navigator>}/>
              <Route path='/pages' element={<Navigator><Pages/></Navigator>}/>
              <Route path='/video' element={<Navigator><Vedio/></Navigator>}/>
              <Route path='/marketplace' element={<Navigator><MarketPlace/></Navigator>}/>
              <Route path='/groups' element={<Navigator><Groups/></Navigator>}/>
              <Route path='/friends' element={<Navigator><Friends/></Navigator>}/>
          </Routes>
       </div>
    </div>
  )
}

export default App
