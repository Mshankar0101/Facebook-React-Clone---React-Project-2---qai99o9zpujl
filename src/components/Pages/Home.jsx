import React,{useContext, useState} from 'react';
import '../../styles/Home.css';
import {GlobalContext} from '../contexts/Contexts';
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const [seeMore, setSeeMore]= useState(true);
  const {resolution, darkMode} = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div className={darkMode?'dark-parent facebook-home-page':'facebook-home-page'}>
      
       <div style={{height:`${resolution.height-56}px`}} className={darkMode?'dark-mode-hover home-left-container': 'home-left-container'}>
          <div>
            <div className='profile'>

            </div>
            <p style={{color:(darkMode? '#fff':'#050505')}}>Madhu shankar</p>
          </div>

          <div onClick={()=>navigate('/pages')}>
             <div className='icon icon1'></div>
             <p style={{color:(darkMode? '#fff':'#050505')}}>Pages</p>
          </div>
 
          <div>
             <div onClick={()=>navigate('/friends')} className='icon icon2'></div>
             <p style={{color:(darkMode? '#fff':'#050505')}}>Friends</p>
          </div>

          <div>
             <div onClick={()=>navigate('/marketplace')} className='icon icon3'></div>
             <p style={{color:(darkMode? '#fff':'#050505')}}>Marketplace</p>
          </div>

          <div>
             <div onClick={()=>navigate('/groups')} className='icon icon4'></div>
             <p style={{color:(darkMode? '#fff':'#050505')}}>Groups</p>
          </div>

          <div>
              <div onClick={()=>navigate('/vedio')} className="icon icon5"></div>
              <p style={{color:(darkMode? '#fff':'#050505')}}>Vedio</p>
          </div>

          <div >
             {seeMore?
              <div style={{cursor:'pointer'}} onClick={()=> setSeeMore(false)} className='see-more' >
                  <div ><MdExpandMore style={{height:'25px',width:'25px',color:(darkMode?'#fff':'#050505')}}/></div>
                  <p style={{color:(darkMode? '#fff':'#050505')}}>See More</p>
              </div>
              :
              <div className={darkMode?'dark-mode-hover expended-div':'expended-div'}>
                  <div>
                      <div className="icon icon6"></div>
                      <p style={{color:(darkMode? '#fff':'#050505')}}>Saved</p>
                  </div>
                  <div>
                      <div className="icon icon7"></div>
                      <p style={{color:(darkMode? '#fff':'#050505')}}>Memories</p>
                  </div>
                  <div>
                      <div className="icon8"></div>
                      <p style={{color:(darkMode? '#fff':'#050505')}}>Ads Manager</p>
                  </div>
                  <div>
                      <div className="icon9"></div>
                      <p style={{color:(darkMode? '#fff':'#050505')}}>Climate Science Center</p>
                  </div>
                  <div>
                      <div className="icon10"></div>
                      <p style={{color:(darkMode? '#fff':'#050505')}}>Events</p>
                  </div>
                  <div>
                      <div className="icon11"></div>
                      <p style={{color:(darkMode? '#fff':'#050505')}}>Facebook Pay</p>
                  </div>
                  <div>
                      <div className="icon12"></div>
                      <p style={{color:(darkMode? '#fff':'#050505')}}>Feeds</p>
                  </div>
                  <div>
                      <div className="icon icon13"></div>
                      <p style={{color:(darkMode? '#fff':'#050505')}}>Fundraisers</p>
                  </div>
                  <div>
                      <div className="icon14"></div>
                      <p style={{color:(darkMode? '#fff':'#050505')}}>Gaming Vedio</p>
                  </div>
                  <div>
                      <div className="icon15"></div>
                      <p style={{color:(darkMode? '#fff':'#050505')}}>Messenger</p>
                  </div>
                  <div>
                      <div className="icon16"></div>
                      <p style={{color:(darkMode? '#fff':'#050505')}}>Messenger kids</p>
                  </div>
                  <div>
                      <div className="icon icon17"></div>
                      <p style={{color:(darkMode? '#fff':'#050505')}}>Play Games</p>
                  </div>
                  <div>
                      <div className="icon18"></div>
                      <p style={{color:(darkMode? '#fff':'#050505')}}>Recent ad activity</p>
                  </div>


                  <div style={{cursor:'pointer'}} onClick={()=> setSeeMore(true)} className='see-less' >
                       <div ><MdExpandLess style={{height:'25px',width:'25px',color:(darkMode?'#fff':'#050505')}} /></div>
                       <p style={{color:(darkMode? '#fff':'#050505')}}>See Less</p>
                  </div>
              </div>
             }
             <div className="bottom-text">
                <p>Privacy &bull; Terms &bull; Advertising &bull; Ad Choices</p>
                <p>&bull; Cookies &bull; More &bull; Meta © 2024</p>
             </div>
          </div>
          
       </div> 
       <div className='home-middle-container'>
         <div className='story-posts'>
              <div className='story'>

              </div>
              {/* call here create post component */}
              <div className='posts'>

              </div>
         </div>
      </div> 
       <div className='home-right-container'>

      </div> 
    </div>
  )
}

export default Home