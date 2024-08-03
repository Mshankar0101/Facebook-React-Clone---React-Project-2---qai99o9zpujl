import React, { useContext } from 'react'
import '../styles/App.css';
import Header from './Header';
import {Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import MobileHeader from './MobileHeader';
import Pages from './Pages/Pages.jsx';
import Vedio from './Pages/Vedio.jsx';
import MarketPlace from './Pages/MarketPlace.jsx'
import Groups from './Pages/Groups.jsx';
import { GlobalContext } from './contexts/Contexts';



const App = () => {
  const {resolution} = useContext(GlobalContext);

  return (
    <div className='app'>
      {
        resolution.width < 850 ?
        <MobileHeader/>
        :
        <Header/>
      }

       <div style={{paddingTop:(resolution.width < 850? 'unset':'56px')}}>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/pages' element={<Pages/>}/>
              <Route path='/vedio' element={<Vedio/>}/>
              <Route path='/marketplace' element={<MarketPlace/>}/>
              <Route path='/groups' element={<Groups/>}/>
               
          </Routes>
       </div>
    </div>
  )
}

export default App
