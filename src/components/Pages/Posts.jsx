import React, { useContext,useEffect,useState } from 'react';
import '../../styles/Posts.css';
import { GlobalContext } from '../contexts/Contexts';
import profile from '../images/profile.jpg';
import { RxCross2 } from "react-icons/rx";
import { IoIosMore } from "react-icons/io";
import story4 from '../images/story/story4.jpg';
import { AiFillLike } from "react-icons/ai";
import { BiSolidMessageRounded } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";
import { Modal, TextField, InputAdornment } from '@mui/material';
import { IoMdSend } from "react-icons/io";

const Posts = ({post}) => {
    const {darkMode}= useContext(GlobalContext);
    const [openModal, setOpenModal]= useState(false);
    const handleClose = ()=> setOpenModal(false);


    // handling post comment
    const [comment, setComment] = useState('');
    const handePostComment = ()=>{

    }

     useEffect(()=>{
        // console.log(_id, author, content, images, createdAt, likeCount, commentCount)
     })

    let profilePic;
  return (
    <div className={darkMode?'dark-background dark-text facebook-posts':'facebook-posts'}>
        <div className='post-heading-container'>
            
                <img src={post.author.profileImage?post.author.profileImage : profile} alt={`${post.author.name}'s profile`} />
           
            <div>
                <p>{post.author.name}</p>
                <p>{post.createdAt}</p>
            </div>
            <div>
               <IoIosMore className='posts-more-icon'/>
            </div>
        </div>
        <div className='post-content'>
            <p>{post.content}</p>
        </div>
        <div style={{display:(post.images[0]?'block':'none')}} className='post-image'>
             <img src={post.images[0]? post.images[0] : '/'} alt='post-img'/>
        </div>
        <div className='likes-comments'>
             <div className='show-like-comments' >
                <div>
                    <div>
                       <AiFillLike  style={{color:'#fff',height:'13px',width:'13px',borderRadius:'50%'}} />
                    </div>
                    <span>{post.likeCount}</span>
                </div>
                <div>
                   
                    <span>{post.commentCount}</span>
                    <BiSolidMessageRounded className='post-icons' />
                </div>
             </div>
             <div>
                <div>
                    <AiOutlineLike className='post-icons' />
                    <span>Like</span>
                </div>
                <div onClick={()=>setOpenModal(true)}>
                    <BiMessageRounded className='post-icons' />
                    <span>Comment</span>
                </div>
                <div>
                     <PiShareFatLight className='post-icons' />
                     <span>Share</span>
                </div>
             </div>
        </div>


        {
            openModal && 
            
               <Modal
                open={openModal}
                onClose={handleClose}
               > 
                    <div className={darkMode?'dark-background-popup dark-text facebook-posts post-comment-modal':'facebook-posts post-comment-modal'}>
                        <div className={darkMode ? 'dark-text heading' : 'heading'} >
                            <p>{`${post.author.name}'s`} Post</p>
                            <div onClick={handleClose}>
                                <RxCross2 className={darkMode ? 'dark-text cross-icon' : 'cross-icon'} />
                            </div>
                        </div>
                        <div className='scrollable-div'>
                        <div className={darkMode?'dark-text post-heading-container':'post-heading-container'}>
                            <img src={post.author.profileImage?post.author.profileImage : profile} alt={`${post.author.name}'s profile`} />
                            <div>
                                <p>{post.author.name}</p>
                                <p>{post.createdAt}</p>
                            </div>
                            <div>
                            <IoIosMore className='posts-more-icon'/>
                            </div>
                        </div>
                        <div className='post-content'>
                            <p>{post.content}</p>
                        </div>
                        <div  style={{display:(post.images[0]?'block':'none'),maxWidth:'700px'}} className='post-image'>
                            <img src={post.images[0]? post.images[0] : '/'} alt='post-img'/>
                        </div>
                        <div className='likes-comments'>
                            <div className='show-like-comments' >
                                <div>
                                    <div>
                                    <AiFillLike  style={{color:'#fff',height:'13px',width:'13px',borderRadius:'50%'}} />
                                    </div>
                                    <span>{post.likeCount}</span>
                                </div>
                                <div>
                                    <span>{post.commentCount}</span>
                                    <BiSolidMessageRounded className='post-icons' />
                                </div>
                            </div>
                            <div style={{borderBottom:'1px solid #ccced3'}}>
                                <div>
                                    <AiOutlineLike className='post-icons' />
                                    <span>Like</span>
                                </div>
                                <div onClick={()=>setOpenModal(true)}>
                                    <BiMessageRounded className='post-icons' />
                                    <span>Comment</span>
                                </div>
                                <div>
                                    <PiShareFatLight className='post-icons' />
                                    <span>Share</span>
                                </div>
                            </div>
                        </div>
                        <div className='all-comments'>
                              <div>
                                 <img src={profile} />
                                 <div style={{backgroundColor:(darkMode?'rgb(50,52,54)':'#e0e4eb')}}>
                                    <div style={{color:(darkMode?'#fff':'#050505')}} >
                                        <p>{"Madhu Shankar"}</p>
                                        <p>{"hi guys"}</p>
                                    </div>
                                    <div style={{color:(darkMode?'#B3B3CC':'rgb(101, 103, 107)')}}>
                                        <span>Like</span>
                                        <span>Reply</span>
                                        <span>Share</span>
                                    </div>
                                 </div>
                              </div>
                        </div>
                        </div>
                        <div className='fixed-comment-container' >
                           <img src={profilePic?profilePic:profile} />
                           <TextField
                                id="input-with-icon-textfield"
                                placeholder={'Comment as Madhu Shankar'}
                                sx={{
                                    width: '100%',
                                    ".MuiOutlinedInput-notchedOutline":{
                                        border: 'none'
                                    },
                                    "& .MuiInputBase-root":{
                                        height: '60px',
                                        backgroundColor:(darkMode?'rgb(50,52,54)':'#e0e4eb'),
                                        borderRadius:'20px',
                                        color: (darkMode?'#fff':'#000')     
                                    },
                                }}
                                InputProps={{
                                // type:'search',
                                endAdornment: (
                                    <InputAdornment position="end">
                                    <IoMdSend  style={{opacity:(comment===''?'0.3':'1')}} className='send-icon' onClick={handePostComment} />
                                    </InputAdornment>
                                ),
                                
                                }}
                                onChange={(e)=>setComment(e.target.value)}
                                variant="outlined"
                                autoFocus
                            />
                        </div>
                    </div>
                </Modal>
            
        }
    </div>
  )
}

export default Posts