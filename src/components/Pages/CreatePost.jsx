import React, { useContext, useState } from 'react'
import '../../styles/CreatePost.css';
import { GlobalContext } from '../contexts/Contexts';
import profile from '../images/profile.jpg';
import { HiVideoCamera } from "react-icons/hi2";
import { MdPhotoLibrary } from "react-icons/md";
import { BiHappy } from "react-icons/bi";

const CreatePost = () => {
    const {darkMode} = useContext(GlobalContext);
    const [modalOpen, setModalOpen]= useState(false);

    let profilePic;
  return (
    <div className={darkMode?'dark-background create-post-container': 'create-post-container'}>
         <div>
             <div>
                <img alt='profile' src={profilePic? profilePic: profile}/>
             </div>
             <div onClick={()=>setModalOpen(true)} style={{backgroundColor:(darkMode?'rgb(80, 86, 92)':'#f0f2f5')}} >
                <p>{"What's on your mind, ...? " }</p>
             </div>
         </div>
         <div className={darkMode?'dark-text create-post-second-div':'create-post-second-div'}>
            <div>
                <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png' alt='live vedio'/>
                <p>Live vedio</p>
            </div>
            <div>
                <img src='https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png' alt='gallery'/>
                <p>Photo/vedio</p> 
            </div>
            <div>
                <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png' alt='feeling'/>
                <p>Feeling/activity</p>
            </div>

         </div>
    </div>
  )
}

export default CreatePost