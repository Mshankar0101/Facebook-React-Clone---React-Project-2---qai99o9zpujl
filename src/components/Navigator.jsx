import React from 'react'
import { Navigate} from 'react-router-dom'

//wrapper component to check is user is inside local storage if not navigating to login 
const Navigator = (props) => {
    
   const userDetails = localStorage.getItem("user")
   const user = JSON.parse(userDetails);
   if(!user || !user.fbToken || !user.id || !user.name){
    return <Navigate to={"/login-signup"} /> 
   }else{
    return props.children; 
   }
}  

export default Navigator