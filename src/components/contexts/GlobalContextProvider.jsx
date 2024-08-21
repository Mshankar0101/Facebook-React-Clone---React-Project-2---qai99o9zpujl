import React, { useState, useEffect } from 'react';
import { GlobalContext } from './Contexts';
import { json } from 'react-router-dom';

const GlobalContextProvider = ({children}) => {
  const [darkMode, setDarkMode]= useState(false); 
  const [resolution, setResolution] = useState({ width: window.innerWidth, height: window.innerHeight });

  // logged in user details
  const [user, setUser]= useState(JSON.parse(localStorage.getItem('user')) || {});

  // liked post id array
  const [likedPosts, setLikedPosts] = useState(JSON.parse(localStorage.getItem('likedPosts')) || []);

  // useEffect(() => {
  //   const handleStorageChange = (e) => {
  //     if (e.key === 'user') {
  //       // Update state when localStorage changes
  //       setUser(JSON.parse(e.newValue) || {});
  //     }
  //   };

  //   // Add event listener for localStorage changes
  //   window.addEventListener('storage', handleStorageChange);

  //   // Clean up the event listener
  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);


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
    <GlobalContext.Provider value={{darkMode, setDarkMode, resolution, setResolution,user,setUser, likedPosts, setLikedPosts}} >
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider