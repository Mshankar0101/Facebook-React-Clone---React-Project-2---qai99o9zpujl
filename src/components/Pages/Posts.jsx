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

const Posts = ({post, fetchPosts}) => {
    const {darkMode, user, likedPosts, setLikedPosts}= useContext(GlobalContext);

    const [openModal, setOpenModal]= useState(false);
    const handleClose = ()=> setOpenModal(false);

    // get all comments on a post
    const [postsComments, setPostsComments] = useState([]);
    const getAllComments = ()=>{
        // console.log(postId)
        const myHeaders = new Headers();
        myHeaders.append("projectID", "ktu17k7gadkn");
        myHeaders.append("Authorization", `Bearer ${user.fbToken}`);

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        };

        fetch(`https://academics.newtonschool.co/api/v1/facebook/post/${post._id}/comments`, requestOptions)
        .then((response) => response.text())
        .then((result) =>{
            const newResult = JSON.parse(result);
            console.log("comments", newResult.data);
            setPostsComments(newResult.data);
        })
        .catch((error) => console.error(error));
    }

     const showComments = ()=>{
        setOpenModal(true);
        getAllComments();
     }


    // handling post comment
    const [comment, setComment] = useState('');
    const handePostComment = ()=>{
        if(comment !== ''){
            const myHeaders = new Headers();
            myHeaders.append("projectID", "ktu17k7gadkn");
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${user.fbToken}`);

            const raw = JSON.stringify({
            "content": comment
            });

            const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            
            };

            fetch(`https://academics.newtonschool.co/api/v1/facebook/comment/${post._id}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                console.log(result);
                getAllComments();
                setComment('');
                fetchPosts();
            })
            .catch((error) => console.error(error));
        }
    }

    //   post api contains these keys
    //    // console.log(_id, author, content, images, createdAt, likeCount, commentCount) 
  
    const handleLikes = ()=>{
        const myHeaders = new Headers();
        myHeaders.append("projectID", "ktu17k7gadkn");
        myHeaders.append("Authorization", `Bearer ${user.fbToken}`);


        const postId = post._id;
        let likedPostsArr = JSON.parse(localStorage.getItem("likedPosts")) || [];
        console.log(likedPostsArr);

        if(likedPostsArr.includes(postId)){
            const requestOptions = {
                method: "DELETE",
                headers: myHeaders,
                };
    
                fetch(`https://academics.newtonschool.co/api/v1/facebook/like/${postId}`, requestOptions)
                .then((response) => response.text())
                .then((result) =>{
                    console.log(result);
                    
                    let filteredLikedPosts = likedPostsArr.filter(id => id !== postId);
                    let jsonString = JSON.stringify(filteredLikedPosts);
                    localStorage.setItem("likedPosts", jsonString);
                    setLikedPosts(jsonString);
                    fetchPosts();
                    console.log("unliked sucessfully",jsonString);
                })
                .catch((error) => console.error(error));


        }else{
            const requestOptions = {
            method: "POST",
            headers: myHeaders,
            };

            fetch(`https://academics.newtonschool.co/api/v1/facebook/like/${postId}`, requestOptions)
            .then((response) => response.text())
            .then((result) =>{
                console.log(result);
                likedPostsArr.push(postId);
                let jsonString = JSON.stringify(likedPostsArr);
                localStorage.setItem("likedPosts", jsonString);
                setLikedPosts(likedPostsArr);
                fetchPosts();

                console.log("liked sucessfully",jsonString)
            })
            .catch((error) => console.error(error));
        }
    }



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
                <div style={{color:(likedPosts.includes(post._id)?'#0866ff':darkMode?'#fff':'#65676B')}} onClick={handleLikes}>
                    {
                        likedPosts.includes(post._id)?
                        <AiFillLike className='post-icons' />
                        :
                        <AiOutlineLike className='post-icons' />
                    }
                    <span>Like</span>
                </div>
                <div onClick={showComments}>
                    <BiMessageRounded className='post-icons' />
                    <span>Comment</span>
                </div>
                <div style={{cursor:'not-allowed'}}>
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
                slotProps={{
                        backdrop:{
                            style:{backgroundColor: darkMode?'rgba(0, 0, 0, 0.6)': 'rgba(255,255,255,0.6)'}
                        }
                    }}
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
                                <div style={{color:(likedPosts.includes(post._id)?'#0866ff':darkMode?'#fff':'#65676B')}} onClick={handleLikes}>
                                    {
                                        likedPosts.includes(post._id)?
                                        <AiFillLike className='post-icons' />
                                        :
                                        <AiOutlineLike className='post-icons' />
                                    }
                                    <span>Like</span>
                                </div>
                                <div>
                                    <BiMessageRounded className='post-icons' />
                                    <span>Comment</span>
                                </div>
                                <div style={{cursor:'not-allowed'}}>
                                    <PiShareFatLight className='post-icons' />
                                    <span>Share</span>
                                </div>
                            </div>
                        </div>
                        <div className='all-comments'>
                            {
                                postsComments.map((comment,i)=>{
                                     return(

                                        <div key={i}>
                                            <img src={comment.author_details.profileImage? profileImage: profile} />
                                            <div style={{backgroundColor:(darkMode?'rgb(50,52,54)':'#e0e4eb')}}>
                                                <div style={{color:(darkMode?'#fff':'#050505')}} >
                                                    <p>{comment.author_details.name}</p>
                                                    <p>{comment.content}</p>
                                                </div>
                                                <div style={{color:(darkMode?'#B3B3CC':'rgb(101, 103, 107)')}}>
                                                    <span>Like</span>
                                                    <span>Reply</span>
                                                    <span>Share</span>
                                                </div>
                                            </div>
                                        </div>
                                     )
                                })
                            }
                        </div>
                        </div>
                        <div className='fixed-comment-container' >
                           <img src={profilePic?profilePic:profile} />
                           <TextField
                                id="input-with-icon-textfield"
                                placeholder={`Comment as ${user.name}`}
                                value={comment}
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