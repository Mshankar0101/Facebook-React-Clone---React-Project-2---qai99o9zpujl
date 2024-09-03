import React, { useContext, useState, useEffect } from 'react'
import '../../styles/ViewPage.css'
import { GlobalContext } from '../contexts/Contexts';
import profile from '../images/profile.jpg';
import image6 from '../images/story/story6.jpg';
import { useLocation } from 'react-router-dom';
import { IoMdAdd, IoIosMail } from "react-icons/io";
import { MdEdit, MdOutlineAccessTimeFilled } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { FaBirthdayCake, FaUser, FaPhoneAlt } from "react-icons/fa";
import { IoIosMale } from "react-icons/io";
import { IoFemaleOutline } from "react-icons/io5";
import { IoAlertCircle } from "react-icons/io5";
import CreatePost from './CreatePost';
import Posts from './Posts';

const ViewPage = ({image, pageDetails}) => {
   const {darkMode, user}= useContext(GlobalContext);
   const location = useLocation();
   const details = JSON.parse(localStorage.getItem('signUpUser')) || {};

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
        if(location.pathname === "/profile"){
            fetchPosts(); 
        }
   },[])

//    accessing id from location's state obj and based on that fetching page contents
   const {pageid} = location.state || {};
    const [content , setContent]= useState({address:[{"street": "750 Barton Motorway","state": "Nevada","country": "Togo"}]});

   const fetchPageContent = (id)=>{
        const myHeaders = new Headers();
        myHeaders.append("projectID", "ktu17k7gadkn");
        myHeaders.append("Authorization", `Bearer ${user.fbToken}`);
        
        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };
        
        if(location.pathname === "/user"){
            fetch(`https://academics.newtonschool.co/api/v1/facebook/user/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) =>{
                 const newResult = JSON.parse(result);
                //  console.log(newResult);
                 if(newResult.status === "success"){
                     setContent(newResult.data);
                 }
            })
            .catch((error) => console.error(error));
        }else{

            fetch(`https://academics.newtonschool.co/api/v1/facebook/channel/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) =>{
                 const newResult = JSON.parse(result);
                //  console.log(newResult);
                 if(newResult.status === "success"){
                    setContent(newResult.data);
                 }
            })
            .catch((error) => console.error(error));
        }
   }
   useEffect(()=>{
    if(location.pathname === "/user" || location.pathname === "/pages/view"){ 
        if(pageid){
          fetchPageContent(pageid);
        }
    }
   },[location.state]);
   
  

    // Mapping through posts and checking if the post's author ID matches the user ID
    let renderPosts = posts.map((postData, i) => {
        if (postData.author._id === user.id) {
            return <Posts key={i} fetchPosts={fetchPosts} post={postData} />;
        }
        return null;
    });

    // Checking if there are any posts that match the condition
    const hasPosts = renderPosts.some(post => post !== null);
    // console.log(renderPosts);




    // style for create page
    const style = {
        height: 'unset',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px'
    }
    const nameDiv = {
        justifyContent: 'center',
        flexDirection: 'column'
    }

  return (
    <div className={darkMode?'dark-parent dark-text view-page-main':'view-page-main'}>
       <div className={darkMode?"dark-background profile-cover-name-main":'profile-cover-name-main'}>
           <div className='cover-photo-main'>
               <div className='cover'>
                  {
                    location.pathname ==='/profile'?
                    <img src={image6} alt='cover-photo'/>
                    :
                    location.pathname ==='/pages/create'?
                    <img  src={image || '/'} alt='cover-photo'/>
                    :
                    location.pathname ==='/user'?
                    <img src={content.profileImage} alt='cover-photo'/>
                    :
                    <img src={Object.keys(content).length > 1? content.image?.replace("cloudflare-ipfs.com","dweb.link") :'/'} alt='cover-photo'/>

                  }
               </div>
           </div>
           <div className='profile-name-other'>
               <div style={location.pathname ==='/pages/create'? style : {}} className='profile-name'>
                   <div style={location.pathname ==='/pages/create'? nameDiv : {}} className='profile-name-div'>
                        <div style={location.pathname ==='/pages/create' || location.pathname ==='/user'? {backgroundColor:'#e0e4eb',marginTop: '-85px'}:{}} className={darkMode?'dark-background':''}>
                            {
                                location.pathname ==='/profile'?
                                <img src={profile} alt='profile-img'/>
                                :
                                location.pathname ==='/pages/create'?
                                <img  src={image || '/'} alt='profile-img'/>
                                :
                                location.pathname ==='/user'?
                                <img src={content.profileImage} alt='profile-img'/>
                                :
                                <img src={Object.keys(content).length > 1? content.image?.replace("cloudflare-ipfs.com","dweb.link"):'/' } alt='profile-img'/>
                            }
                        </div>
                        {
                             location.pathname ==='/pages/create'?
                             <p style={{textAlign:'center',lineHeight:'35px'}}>{pageDetails.pagename}</p>
                             :
                             <p>{location.pathname ==='/profile'? user.name : content.name }</p>
                        }
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
                        location.pathname ==='/pages/create'?
                        <div className='page'>
                            <p>Intro</p>
                            <p>{pageDetails.bio}</p>
                            <div className='intro-divs'>
                                  <FaUser className='icon' />
                                  <p>0 Followers</p>
                            </div>
                            <div className='intro-divs'>
                                  <IoAlertCircle className='icon' />
                                  <p>Page &bull; {pageDetails.category ||  "Category"}</p>
                            </div>
                        </div>
                        :
                        location.pathname === "/user"?
                        <div className='page'>
                            <p>Intro</p>
                            <p>{content.description}</p>
                            <div className='intro-divs'>
                                  <FaUser className='icon' />

                                  <p>{Object.keys(content).length > 1 && content.name}</p>
                            </div>
                            <div className='intro-divs'>
                                    {Object.keys(content).length > 1  && (
                                        content.gender === 'male' ? 
                                        <IoIosMale className='icon' /> 
                                        : 
                                        <IoFemaleOutline className='icon' />
                                    )}

                                  <p>{Object.keys(content).length > 1  && content.gender}</p>
                            </div>
                            <div className='intro-divs'>
                                  <IoIosMail className='icon' />
                                  <p>{Object.keys(content).length > 1 && content.email}</p>
                            </div>
                            <div className='intro-divs'>
                                 <FaPhoneAlt className='icon' />
                                  <p>{Object.keys(content).length > 1 && content.phone}</p>
                            </div>
                            <div className='intro-divs'>
                                  <MdOutlineAccessTimeFilled className='icon' />
                                  <p>{content.createdAt}</p>
                            </div>
                            <div className='intro-divs'>
                                  <FaLocationDot className='icon' />
                                  <p>{Object.keys(content).length > 1 && `${content.address[0].street}, ${content.address[0].state}, ${content.address[0].country}` }</p>
                            </div> 
                        </div>
                           :
                        <div className='page'>
                            <p>Intro</p>
                            <p>{content.description}</p>
                            <div className='intro-divs'>
                                  <FaUser className='icon' />

                                  <p>{Object.keys(content).length > 1 && content.owner["name"]}</p>
                            </div>
                            <div className='intro-divs'>
                                    {Object.keys(content).length > 1 && (
                                        content.owner.gender === 'male' ? 
                                        <IoIosMale className='icon' /> 
                                        : 
                                        <IoFemaleOutline className='icon' />
                                    )}

                                  <p>{Object.keys(content).length > 1 && content.owner["gender"]}</p>
                            </div>
                            <div className='intro-divs'>
                                  <IoIosMail className='icon' />
                                  <p>{Object.keys(content).length > 1 && content.owner["email"]}</p>
                            </div>
                            <div className='intro-divs'>
                                 <FaPhoneAlt className='icon' />
                                  <p>{Object.keys(content).length > 1 && content.owner["phone"]}</p>
                            </div>
                            <div className='intro-divs'>
                                  <MdOutlineAccessTimeFilled className='icon' />
                                  <p>{content.createdAt}</p>
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
                            {/* {
                               posts.map((postData,i)=>{   
                                    if( postData.author._id === user.id){
                                        return <Posts key={i} fetchPosts={fetchPosts} post={postData} />
                                    }
                                    return null;
                                })
                                    // <h2 style={{textAlign:'center',width:'100%'}}> You have not posted anything yet.</h2>
                            } */}
                            {hasPosts ? (
                                renderPosts
                            ) : (
                                <h2 style={{ textAlign: 'center', width: '100%' }}>
                                    You have not posted anything yet.
                                </h2>
                             )}
                        </div>
                    :<h2  style={{textAlign:'center', width:"100%", display:location.pathname === '/pages/create'? 'none':'block'}}>{location.pathname=== '/user'? "There is not any post on this profile!!":"There is not any post on this page!!"}</h2>
                }
              
            </div>

       </div>
    </div>
  )
}

export default ViewPage