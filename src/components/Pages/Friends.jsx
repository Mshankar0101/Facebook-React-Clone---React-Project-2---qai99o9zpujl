import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../contexts/Contexts';
import { RiSettings5Fill } from "react-icons/ri";

const Friends = () => {
    const {darkMode, resolution}= useContext(GlobalContext);
   
    const [friends, setFriends] = useState([]);
   const fetchPosts = ()=>{
        const myHeaders = new Headers();
        myHeaders.append("projectID", "ktu17k7gadkn");
        
        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };
        
        fetch("https://academics.newtonschool.co/api/v1/facebook/post?limit=200", requestOptions)
        .then((response) => response.text())
        .then((result) =>{
            const newResult = JSON.parse(result);
            // console.log(newResult.data);
            setFriends(newResult.data);
        })
        .catch((error) => console.error(error));
   }

   useEffect(()=>{
    fetchPosts();
   },[])




  return (
    <div style={{height:resolution.width> 900?`${resolution.height - 56}px`:"unset"}} className={darkMode? "dark-parent dark-text friends-page":"friends-page"}>
        <div style={{height:resolution.width> 900?`${resolution.height - 56}px`:"unset"}}  className={darkMode?"dark-header-style friends-sidebar":"friends-sidebar"}>
              <div>
                   <h1>Friends</h1>
                   <div className={darkMode?'dark-background round-div-upcoming-page':'round-div-upcoming-page'}>
                      <RiSettings5Fill className='icons-upcoming-page' />
                   </div>
              </div>
              <div className='options'>
                  <div>
                      <div className='icon-div' >
                        <div className='icons friends-icon1'></div>
                      </div>
                      <p>Home</p>
                  </div>
                  <div>
                      <div className='icon-div' >
                        <div className='icons friends-icon2'></div>
                      </div>
                      <p>Friend Requests</p>
                  </div>
                  <div>
                      <div className='icon-div' >
                        <div className='icons friends-icon3'></div>
                      </div>
                      <p>Suggestions</p>
                  </div>
                  <div>
                      <div className='icon-div' >
                        <div className='icons friends-icon4'></div>
                      </div>
                      <p>All friends</p>
                  </div>
                  <div>
                      <div className='icon-div' >
                        <div className='icons friends-icon5'></div>
                      </div>
                      <p>Birthdays</p>
                  </div>
                  <div>
                      <div className='icon-div' >
                        <div className='icons friends-icon6'></div>
                      </div>
                      <p>Custom Lists</p>
                  </div>
              </div>
        </div>
        <div className='friends-card'>
              <p>All Friends</p>
              <div className='friends-card-main'>
                  {
                      friends.map((user,i)=>{   
                      if(user.author.profileImage !== null){
                        return(  <div className={darkMode?'dark-background card':'card'}>
                            <div>
                              <img src={user.author.profileImage} alt='profile'/>
                            </div>
                            <div>
                                <p>{user.author.name}</p>
                            </div>
                          </div>)
                      }
                      return null;
                    })

                  }
              </div>
        </div>
    </div> 
  )
}

export default Friends