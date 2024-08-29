import React, { useContext, useState, useEffect } from 'react'
import '../../styles/ViewPage.css'
import { GlobalContext } from '../contexts/Contexts';
import profile from '../images/profile.jpg';
import { json, useLocation } from 'react-router-dom';
import { IoMdAdd, IoIosMail } from "react-icons/io";
import { MdEdit, MdOutlineAccessTimeFilled } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { FaBirthdayCake, FaUser, FaPhoneAlt } from "react-icons/fa";
import { IoIosMale } from "react-icons/io";
import { IoFemaleOutline } from "react-icons/io5";
import CreatePost from './CreatePost';
import Posts from './Posts';

const ViewPage = () => {
   const {darkMode, user}= useContext(GlobalContext);
   const location = useLocation();
   const details = JSON.parse(localStorage.getItem('signUpUser'));

   //   post rendering logic
   const [posts, setPosts] = useState([]);
   const fetchPosts = ()=>{
        const myHeaders = new Headers();
        myHeaders.append("projectID", "ktu17k7gadkn");
        
        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };
        
        fetch("https://academics.newtonschool.co/api/v1/facebook/post?limit=100", requestOptions)
        .then((response) => response.text())
        .then((result) =>{
            const newResult = JSON.parse(result);
            // console.log(newResult.data);
            setPosts(newResult.data);
        })
        .catch((error) => console.error(error));
   }

   useEffect(()=>{
    fetchPosts(); 
   },[])


  return (
    <div className={darkMode?'dark-parent dark-text view-page-main':'view-page-main'}>
       <div className={darkMode?"dark-background profile-cover-name-main":'profile-cover-name-main'}>
           <div className='cover-photo-main'>
               <div className='cover'>
                  <img src={profile} alt='cover-photo'/>
               </div>
           </div>
           <div className='profile-name-other'>
               <div className='profile-name'>
                   <div className='profile-name-div'>
                        <div className={darkMode?'dark-background':''}>
                            <img src={profile} alt='profile-img'/>
                        </div>
                        <p>Madhu Shankar</p>
                   </div>
                   {
                    location.pathname === '/profile' ? 
                        <div className='add-edit'>
                            <div>
                                <IoMdAdd />
                                <span>Add to story</span>
                            </div>
                            <div>
                                <MdEdit />
                                <span>Edit profile</span>
                            </div>
                        </div>
                        :
                        <div className='subscribe-message-follow'>
                            <div>
                                 <img src='https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/jg-uKSj5xwK.png'/>
                                 <span>Subscribe</span>
                            </div>
                            <div>
                                <img src='https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/YjBUcSAL8TC.png'/>
                                <span>Message</span>
                            </div>
                            <div>
                                 <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yw/r/LJ8KuNpi23A.png'/>
                                 <span>Follow</span>
                            </div>
                        </div>
                   }

               </div>
               <div className='other'>
                   {
                     location.pathname === '/profile' ?
                        <div>
                            <span>Posts</span>
                            <span>About</span>
                            <span>Friends</span>
                            <span>Photos</span>
                            <span>Video</span>
                            <span>Check-ins</span>
                        </div>
                        :
                        <div>
                            <span>Posts</span>
                            <span>Subscriber hub</span>
                            <span>About</span>
                            <span>Mentions</span>
                            <span>Reviews</span>
                            <span>Reels</span>
                        </div>
                   }
               </div>
           </div>
       </div>

       <div className='intro-post'>
           <div className="intro-friends-photos">
                <div className={darkMode?'dark-background intro':'intro'}>
                    {
                        location.pathname === '/profile' ?
                        <div className='profile'>
                            <p>Intro</p>
                            <p>Hii i am {user.name}, Welcome to my profile.</p>
                            <p style={{color:'#050505'}}> Edit bio</p>
                            <div className='intro-divs'>
                               <RiGraduationCapFill className='icon' />
                               <p>Studed at <b>XYZ Univercity</b></p>
                            </div>
                            <div className='intro-divs'>
                               <RiGraduationCapFill className='icon' />
                               <p>Went to <b>XYZ Public School</b></p>
                            </div>
                            <div className='intro-divs'>
                               <FaLocationDot className='icon' />
                               <p>From <b>India</b></p>
                            </div>
                            {
                               Object.keys(details).length !== 0?
                               
                                <div>
                                    <div className='intro-divs'>
                                        {
                                            details.gender === 'male'?
                                            <IoIosMale className='icon' />
                                            :
                                            <IoFemaleOutline className='icon' />
                                        }
                                        <p> Gender <b>{details.gender}</b></p>
                                    </div>
                                    <div className='intro-divs'>
                                       <FaBirthdayCake className='icon' />
                                       <p> Birthday <b>{details.dob.day}, {details.dob.month}</b></p>
                                    </div>
                                </div>
                                :
                                null
                            }
                        </div>
                        :
                        <div className='page'>
                            <p>Intro</p>
                            <p>description</p>
                            <div className='intro-divs'>
                                  <FaUser className='icon' />
                                  <p>owner.name</p>
                            </div>
                            <div className='intro-divs'>
                                       {/* {
                                            owner.gender === 'male'?
                                            <IoIosMale className='icon' />
                                            :
                                            <IoFemaleOutline className='icon' />
                                        } */}
                                  <p>owner.gender</p>
                            </div>
                            <div className='intro-divs'>
                                  <IoIosMail className='icon' />
                                  <p>owner.email</p>
                            </div>
                            <div className='intro-divs'>
                                 <FaPhoneAlt className='icon' />
                                  <p>phone</p>
                            </div>
                            <div className='intro-divs'>
                                  <MdOutlineAccessTimeFilled className='icon' />
                                  <p>createdAt</p>
                            </div>
                            <div className='intro-divs'>
                                  <FaLocationDot className='icon' />
                                  <p>848 Jefferey Forest, South Jaren, Maryland, Finland</p>
                            </div>
                        </div>
                    }
                </div>
                {
                    location.pathname === '/profile'?
                    <div className={darkMode?'dark-background friends':'friends'}>
                        <span>Friends</span>
                        <span>See all Friends</span>
                    </div>
                    :null
                }
                <div className={darkMode?'dark-background photos':'photos'}>
                    <span>Photos</span>
                    <span>See all Photos</span>
                </div>

                <span className='bottom-text'>Privacy  · Terms  · Advertising  · Ad Choices   · Cookies  · More  · Meta © 2024</span>
           </div>
            <div className="create-post-allposts">
                {
                    location.pathname === '/profile'?
                       <CreatePost/>
                    :null
                }
                {
                    location.pathname === '/profile'?
                        <div className='profile-posts'>

                            {posts.map((postData,i)=>{   
                                    if( postData.author._id === user.id){
                                        return <Posts key={i} fetchPosts={fetchPosts} post={postData} />
                                    }
                                    return null;
                                })

                            }
                        </div>
                    :null
                }
              
            </div>

       </div>
    </div>
  )
}

export default ViewPage