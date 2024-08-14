import React, { useState, useEffect } from 'react';
import { GlobalContext } from './Contexts';
import { json } from 'react-router-dom';

const GlobalContextProvider = ({children}) => {
  const [darkMode, setDarkMode]= useState(false); 
  const [resolution, setResolution] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [user, setUser]= useState({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTYyMWQyYTA2ZjFjNjkwYzYzZGQ3MCIsImlhdCI6MTcyMjE2MzY2NiwiZXhwIjoxNzUzNjk5NjY2fQ.C6Lpp1Q5pFwzpj1jjzx4_GWEoBt1x75MDVT9YKgaxrg"});

  // liked post id array
  const [likedPosts, setLikedPosts] = useState(JSON.parse(localStorage.getItem('likedPosts')) || []);



  useEffect(() => {
    const handleResize = () => {
      setResolution({ width: window.innerWidth, height: window.innerHeight });
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
    return (
    <GlobalContext.Provider value={{darkMode, setDarkMode, resolution, setResolution,user, likedPosts, setLikedPosts}} >
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider