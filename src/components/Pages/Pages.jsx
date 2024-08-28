import React, { useContext, useEffect, useState } from 'react'
import { RiPagesFill } from "react-icons/ri";
import { HiSpeakerphone } from "react-icons/hi";
import { GlobalContext } from '../contexts/Contexts';
import { RiSettings5Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const Pages = () => {
  const {darkMode, resolution, user}= useContext(GlobalContext);
  const navigate = useNavigate();


  // fething pages 
  const [pages, setPages]= useState([]);
  const fetchPages = ()=>{
    const myHeaders = new Headers();
    myHeaders.append("projectID", "ktu17k7gadkn");
    myHeaders.append("Authorization", `Bearer ${user.fbToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      // redirect: "follow"
    };

    fetch("https://academics.newtonschool.co/api/v1/facebook/channel?limit=100", requestOptions)
    .then((response) => response.text())
    .then((result) =>{
        const newResult = JSON.parse(result);
        console.log("comments", newResult.data);
        setPages(newResult.data);
    })
    .catch((error) => console.error(error));
  }

  useEffect(()=>{
    fetchPages();
  },[]);





  return (
    <div style={{height:resolution.width> 900?`${resolution.height - 56}px`:"unset"}}  className={darkMode?'dark-parent dark-text pages-container' : 'pages-container'}>
         <div style={{height:resolution.width> 900?`${resolution.height - 56}px`:"unset"}}  className={darkMode?'dark-header-style pages-sidebar':'pages-sidebar'}>
             <div>
                  <div className='name-setting'>
                      <h1>Pages</h1>
                      <div className={darkMode?'dark-background round-div-upcoming-page':'round-div-upcoming-page'}>
                          <RiSettings5Fill className='icons-upcoming-page' />
                      </div>
                  </div>
                  <div onClick={()=>navigate('/pages/create')} style={{cursor:'pointer'}} className={darkMode?'dark-background create':'create'}>
                      <p onClick={()=>navigate('/pages/create')}>+ Create new Page</p>
                  </div>
             </div>
             <div className='options'>
                  <div>
                      <div className='icon-div' >
                        <div className='icons pages-icon1'></div>
                      </div>
                      <p>Meta Buisness Suite</p>
                  </div>
                  <div>
                      <div className='icon-div' >
                        <div className='icons pages-icon2'></div>
                      </div>
                      <p>Discover</p>
                  </div>
                  <div>
                      <div className='icon-div' >
                        <div className='icons pages-icon3'></div>
                      </div>
                      <p>Liked Pages</p>
                  </div>
                  <div>
                      <div className='icon-div' >
                        <div className='icons pages-icon4'></div>
                      </div>
                      <p>Invites</p>
                  </div>
              </div>
         </div>
         <div className='pages-card'>
             <p>Discover Pages Suggested for you</p>
             <div className='pages-card-main'>
                 {
                    pages.map((page, index) => {
                      if(page.owner.profileImage && page.image){
                        let url = page.image;
                        let newUrl = url.replace("cloudflare-ipfs.com","dweb.link")
                        return(
                            <div key={index} className={darkMode?'dark-background card':'card'}>
                                <div style={{marginBottom:'5px'}}>
                                    <div className="profile">
                                        <img src={newUrl} alt='profile'/>
                                    </div>
                                    <div>
                                        <p>{page.name}</p>
                                        <p style={{fontSize:'12px',opacity:'0.5'}}>{page.createdAt}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                      <RiPagesFill className='page-card-icon'/>
                                      <span>View page</span>
                                    </div>
                                    <div style={{backgroundColor:darkMode?'rgba(255, 255, 255, 0.1)':'rgb(228, 230, 235)'}}>
                                      <HiSpeakerphone className='page-card-icon'/>
                                      <span>Promote</span>
                                    </div>
                                </div>
                            </div>
                        )
                      }
                         return null
                    })
                 }
             </div>
         </div>
    </div>
  )
}

export default Pages