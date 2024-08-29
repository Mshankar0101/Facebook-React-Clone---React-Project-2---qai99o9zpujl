import React, { useContext, useState, useRef, useEffect } from 'react'
import '../../styles/CreatePost.css';
import { GlobalContext } from '../contexts/Contexts';
import profile from '../images/profile.jpg';
import { Modal } from '@mui/material';
import { RxCross2 } from "react-icons/rx";
import { MdPublic } from "react-icons/md";
import { useLocation } from 'react-router-dom';

const CreatePost = () => {
    const { darkMode, user, modalOpen, setModalOpen } = useContext(GlobalContext);
    const location = useLocation();
    
    const handleClose = () => setModalOpen(false);
    const handleOpen = () => setModalOpen(true);

    // handling image upload
    const fileInputRef = useRef(null);
    const [image, setImage] = useState('');
    const [file, setFile] = useState([]);

    function previewImage(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImage(reader.result);
        }

    }

    function handleImageChange(e) {
        console.log(e.target.files);
        const file = e.target.files[0];
        setFile(e.target.files ?? []);
        previewImage(file);

    }
    const removeCurrentImage = () => {
        setImage('');
        setFile([]);
        fileInputRef.current ? fileInputRef.current.value = '' : null;
    }


    // creat post request
    const [content, setContent] = useState('');
    const handlePostSubmission = () => {
        const myHeaders = new Headers();
        myHeaders.append("projectID", "ktu17k7gadkn");
        myHeaders.append("Authorization", `Bearer ${user.fbToken}`);
        
        const formdata = new FormData();
        formdata.append("title", "newton");
        formdata.append("content", content);
        if(file[0]){
            formdata.append("images", file[0], "abc-abc.jpg");
        }

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };

        fetch("https://academics.newtonschool.co/api/v1/facebook/post/", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                    alert(`HTTP error! Status: ${response.status}`);
                    return null;
                }
                return response.text();
            })
            .then((result) => {
                if(result){
                    console.log(result);
                    alert('Created Post Successfully!');
                    handleClose();
                }
            })
            .catch((error) => {
                console.error("Error:", error.message);
                alert(`An error occurred: ${error.message}`);
            });
        
    }


    useEffect(() => {
        // console.log();
    }, [])



    let profilePic;
    return (
        <div style={{maxWidth: location.pathname === '/profile'?'540px':'500px'}} className={darkMode ? 'dark-background create-post-container' : 'create-post-container'}>
            <div >
                <div>
                    <img alt='profile' src={profilePic ? profilePic : profile} />
                </div>
                <div className='createpost-input-div' onClick={handleOpen} style={{ backgroundColor: (darkMode ? 'rgb(80, 86, 92)' : '#f0f2f5') }} >
                    <p>{`What's on your mind, ${user.name}?`}</p>
                </div>
            </div>
            <div className={darkMode ? 'dark-text create-post-second-div' : 'create-post-second-div'}>
                <div onClick={handleOpen}>
                    <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png' alt='live vedio' />
                    <p>Live vedio</p>
                </div>
                <div onClick={handleOpen}>
                    <img src='https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png' alt='gallery' />
                    <p>Photo/vedio</p>
                </div>
                <div onClick={handleOpen}>
                    <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png' alt='feeling' />
                    <p>Feeling/activity</p>
                </div>

            </div>
            {
                modalOpen &&
                <Modal
                    open={modalOpen}
                    onClose={handleClose}
                    slotProps={{
                        backdrop:{
                            style:{backgroundColor:darkMode?'rgba(0, 0, 0, 0.6)': 'rgba(255,255,255,0.6)'}
                        }
                    }}
                >
                    <div className={darkMode ? 'dark-background-popup modal-create-post' : 'modal-create-post'}>
                        <div className={darkMode ? 'dark-text heading' : 'heading'}>
                            <p>Create post</p>
                            <div onClick={handleClose}>
                                <RxCross2 className={darkMode ? 'dark-text cross-icon' : 'cross-icon'} />
                            </div>
                        </div>
                        <div className='create-post-profile-name'>
                            <div>
                                <img alt='profile' src={profilePic ? profilePic : profile} />
                            </div>
                            <div>
                                <p>Madhu Shankar</p>
                                <div>
                                    <MdPublic style={{ marginRight: '5px' }} />
                                    <p>Public</p>
                                </div>
                            </div>
                        </div>
                        <div className='create-post-textbox' >
                            <textarea autoFocus onChange={(e) => setContent(e.target.value)} className={darkMode ? 'dark-text dark-background-popup' : ''} placeholder={`What's on your mind, ${user.name}?`}  ></textarea>
                        </div>
                        <div style={{ display: (!image ? 'none' : 'block') }} className='post-uploaded-img'>
                            <img src={image} alt='post img' />
                            <div onClick={removeCurrentImage}>
                                <RxCross2 className={darkMode ? 'dark-text cross-icon' : 'cross-icon'} />
                            </div>
                        </div>
                        <div className='post-upload-image'>
                            <input ref={fileInputRef} type='file' id='upload-image' onChange={handleImageChange} accept='image/*' />
                            <div>
                                <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/b37mHA1PjfK.png' alt='tag friends' />
                                <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png' alt='feeling' />
                                <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/q7MiRkL7MLC.png' alt='gif' />
                            </div>

                        </div>
                        <div className='submit-post'>
                            <button disabled={content === '' && file.length === 0} onClick={handlePostSubmission}>Post</button>
                        </div>

                    </div>

                </Modal>
            }
        </div>
    )
}

export default CreatePost