import React, { useContext } from 'react'
import '../styles/App.css';
import Header from './Header';
import {Routes, Route} from 'react-router-dom';
import Home from './Home';
import MobileHeader from './MobileHeader';
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

       <div style={{paddingTop:(resolution.width < 850? 'unset':'55px')}}>
          <Routes>
              <Route path='/' element={<Home/>}/>
          </Routes>
       </div>
    </div>
  )
}

export default App
