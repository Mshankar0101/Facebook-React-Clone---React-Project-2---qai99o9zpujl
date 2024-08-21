import React,{useContext, useEffect, useState} from 'react';
import '../../styles/Home.css';
import {GlobalContext} from '../contexts/Contexts';
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import {useNavigate} from 'react-router-dom';
import prime from '../images/prime.webp';
import adstwo from '../images/adstwo.jpg';
import Story from './Story';
import profile from '../images/profile.jpg';
import CreatePost from './CreatePost';
import Posts from './Posts';

const Home = () => {
  const [seeMore, setSeeMore]= useState(true);
  const {resolution, darkMode, user} = useContext(GlobalContext);
  const navigate = useNavigate();


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
            console.log(newResult.data);
            setPosts(newResult.data);
        })
        .catch((error) => console.error(error));
   }

   useEffect(()=>{
    fetchPosts();
   },[])

  let profilePic;
  return (
    <div className={darkMode?'dark-parent facebook-home-page':'facebook-home-page'}>
      
       <div style={{height:`${resolution.height-56}px`, display:(resolution.width < 1100? 'none':'block')}} className={darkMode?'dark-mode-hover home-left-container': 'home-left-container'}>
          <div>
            <div className='profile'>
                <img alt='profile' src={profilePic? profilePic:profile} />
            </div>
            <p >{user.name}</p>
          </div>

          <div onClick={()=>navigate('/pages')}>
             <div className='icon icon1'></div>
             <p onClick={()=>navigate('/pages')} >Pages</p>
          </div>
 
          <div>
             <div onClick={()=>navigate('/friends')} className='icon icon2'></div>
             <p onClick={()=>navigate('/friends')} >Friends</p>
          </div>

          <div>
             <div onClick={()=>navigate('/marketplace')} className='icon icon3'></div>
             <p onClick={()=>navigate('/marketplace')} >Marketplace</p>
          </div>

          <div>
             <div onClick={()=>navigate('/groups')} className='icon icon4'></div>
             <p onClick={()=>navigate('/groups')} >Groups</p>
          </div>

          <div>
              <div onClick={()=>navigate('/video')} className="icon icon5"></div>
              <p onClick={()=>navigate('/video')} >Vedio</p>
          </div>

          <div >
             {seeMore?
              <div style={{cursor:'pointer'}} onClick={()=> setSeeMore(false)} className='see-more' >
                  <div ><MdExpandMore style={{height:'25px',width:'25px',color:(darkMode?'#fff':'#050505')}}/></div>
                  <p >See More</p>
              </div>
              :
              <div className={darkMode?'dark-mode-hover expended-div':'expended-div'}>
                  <div>
                      <div className="icon icon6"></div>
                      <p >Saved</p>
                  </div>
                  <div>
                      <div className="icon icon7"></div>
                      <p >Memories</p>
                  </div>
                  <div>
                      <div className="icon8"></div>
                      <p >Ads Manager</p>
                  </div>
                  <div>
                      <div className="icon9"></div>
                      <p >Climate Science Center</p>
                  </div>
                  <div>
                      <div className="icon10"></div>
                      <p >Events</p>
                  </div>
                  <div>
                      <div className="icon11"></div>
                      <p >Facebook Pay</p>
                  </div>
                  <div>
                      <div className="icon12"></div>
                      <p >Feeds</p>
                  </div>
                  <div>
                      <div className="icon icon13"></div>
                      <p >Fundraisers</p>
                  </div>
                  <div>
                      <div className="icon14"></div>
                      <p >Gaming Vedio</p>
                  </div>
                  <div>
                      <div className="icon15"></div>
                      <p >Messenger</p>
                  </div>
                  <div>
                      <div className="icon16"></div>
                      <p >Messenger kids</p>
                  </div>
                  <div>
                      <div className="icon icon17"></div>
                      <p >Play Games</p>
                  </div>
                  <div>
                      <div className="icon18"></div>
                      <p >Recent ad activity</p>
                  </div>


                  <div style={{cursor:'pointer'}} onClick={()=> setSeeMore(true)} className='see-less' >
                       <div ><MdExpandLess style={{height:'25px',width:'25px',color:(darkMode?'#fff':'#050505')}} /></div>
                       <p >See Less</p>
                  </div>
              </div>
             }
             <div className="bottom-text">
                <p style={{color:'#656768'}}>Privacy &bull; Terms &bull; Advertising &bull; Ad Choices</p>
                <p style={{color:'#656768'}}>&bull; Cookies &bull; More &bull; Meta © 2024</p>
             </div>
          </div>
          
       </div> 
       <div style={{height:(resolution.width > 900?`${resolution.height-56}px`:`unset`)}} className='home-middle-container'>
         <div  className='story-posts'>
              <div className='story'>
                 <Story/>
              </div>
              <CreatePost/>
              <div className='posts'>
                {posts.map((postData,i)=>{   
                    if(postData.images[0] && postData.author.profileImage !== null){
                        return <Posts key={i} fetchPosts={fetchPosts} post={postData} />
                    }
                    return null;
                })

                }
              </div>
         </div>
      </div> 
       <div style={{display:(resolution.width < 900? 'none':'block')}} className='home-right-container'>
          <p>Sponsored</p>
          <div className={darkMode? 'dark-text ads-description':'ads-description'}>
            <img src={adstwo} alt='ads'/>
            <div >
               <p>Learn Hypnosis in just <b>1 month</b></p>
               <a href='exly.co.in'>exly.co.in/learnhypnosis</a>
            </div>
          </div>
          <div style={{borderBottom: '1px solid rgb(97, 100, 102, 0.5)'}} className={darkMode? 'dark-text ads-description':'ads-description'}>
            <img src={prime} alt='ads'/>
            <div >
               <p>Join Prime and Get ads free subscription just at <b>₹1499</b> for <b>12 months.</b> </p>
               <a href='https://www.primevideo.com/offers/nonprimehomepage/ref=dv_web_force_root'>https://www.primevideo.com</a>
            </div>
          </div>
          <p>Birthdays</p>
          <div className={darkMode? 'dark-text birthday-notification':'birthday-notification'}>
            {/* <img src='	https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/jGIHAYEO3Pc.png' alt='icon'/> */}
            <div></div>
            <p><b>Madhu Shankar</b> and <b>7 others</b> have birthdays today</p>
          </div>
      </div> 
    </div>
  )
}

export default Home