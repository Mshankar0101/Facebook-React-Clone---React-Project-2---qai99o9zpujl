import React,{useContext, useState} from 'react'
import { GlobalContext } from '../contexts/Contexts';
import { TextField } from '@mui/material';
import ViewPage from './ViewPage';
import axios from 'axios';

const CreatePage = () => {
    const {darkMode, resolution, user}=useContext(GlobalContext);

    // handling preview page 
    const [image, setImage] = useState('');
    const [file, setFile] = useState([]);
    const [pageDetails, setPageDetails]= useState({pagename:'', category:'', bio:''});

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


    // post request to submit post 

    const createPage = async()=>{
       
        const formdata = new FormData();
        formdata.append("name", pageDetails.pagename);
        formdata.append("description", pageDetails.bio);
        formdata.append("title", pageDetails.category);
        if(file[0]){
            formdata.append("images", file[0], "abc-abc.jpg");
        }else{
            formdata.append("images", undefined);
        }

        try {
            const result = await axios.post('https://academics.newtonschool.co/api/v1/facebook/channel/', formdata, {
                headers: {
                    Authorization: `Bearer ${user.fbToken}`,
                    projectID: "ktu17k7gadkn"
                }
            } );
            // console.log(result);
            if(result){
                if(result.data.status === "success"){
                    console.log(result.data);
                    alert("Page created Successfully!!");
                }else if(result.data.status === "fail"){
                    alert(result.data.message);
                }
            }
        }catch(e){
            alert(e.response.data.message || e.message);
            // console.log(e);
        }


        // const myHeaders = new Headers();
        // myHeaders.append("projectID", "ktu17k7gadkn");
        // myHeaders.append("Authorization", `Bearer ${user.fbToken}`);

        // const requestOptions = {
        // method: "POST",
        // headers: myHeaders,
        // body: formdata,
        // redirect: "follow"
        // };

        // fetch("https://academics.newtonschool.co/api/v1/facebook/channel/", requestOptions)
        // .then((response) => {
        //     if (!response.ok && response.status !== 400) {
        //         alert(`HTTP error! Status: ${response.status}`);
        //         return null;
        //     }
        //     return response.text();
        // })
        // .then((result) => {
        //     console.log(result);
        //     const parsedResult = JSON.parse(result)
        //     if(parsedResult && parsedResult.status === "success"){
        //         console.log(result);
        //         alert('Created Page Successfully!!');
        //     }else if(parsedResult  && parsedResult.status === "fail"){
        //         alert(result.message);
        //     }
        // })
        // .catch((error) => {
        //     console.error("Error:", error.message);
        //     alert(`An error occurred: ${error.message}`);
        // });
    }

  return (
    <div style={{height:resolution.width> 900?`${resolution.height - 56}px`:"unset"}}  className={darkMode?'dark-parent dark-text create-page':'create-page'}>
        <div style={{height:resolution.width> 900?`${resolution.height - 56}px`:"unset"}} className={darkMode?'.dark-header-style create-page-sidebar':'create-page-sidebar'}>
            <p>Pages &gt; Create a page</p>
            <p>Create a Page</p>
            <p>Your Page is where people go to learn more about you. Make sure yours has all the information they may need.</p>
            <div className='scroll-div'>
                   <TextField fullWidth id="outlined-basic" placeholder="Page name (required)" variant="outlined" 
                       value={pageDetails.pagename} 
                       onChange={(e)=>{
                        setPageDetails({...pageDetails, pagename:e.target.value})
                       }}
                       sx={{
                       

                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: '#dddfe2', // Initial border color (remove hover outline)
                          },
                          "&:hover fieldset": {
                            borderColor: '#dddfe2', // Remove hover outline
                          },
                          "&.Mui-focused fieldset": {
                            border: '2px solid #0866ff', // Focused border color
                          },
                          height: '52px',
                          backgroundColor: darkMode ? '#3c4245' : '#fff',
                          borderRadius: '6px',
                          color: darkMode ? '#fff' : '#1d2129',
                        }
                        
                       }}
                     />
                     <p className='input-description'>Use the name of your business, brand or organization, or a name that helps explain your Page.</p>

                   <TextField fullWidth id="outlined-basic" placeholder="Category (required)" variant="outlined" 
                       value={pageDetails.category } 
                       onChange={(e)=>{
                        setPageDetails({...pageDetails, category:e.target.value})
                       }}
                       sx={{
                       

                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: '#dddfe2', // Initial border color (remove hover outline)
                          },
                          "&:hover fieldset": {
                            borderColor: '#dddfe2', // Remove hover outline
                          },
                          "&.Mui-focused fieldset": {
                            border: '2px solid #0866ff', // Focused border color
                          },
                          height: '52px',
                          backgroundColor: darkMode ? '#3c4245' : '#fff',
                          borderRadius: '6px',
                          color: darkMode ? '#fff' : '#1d2129',
                        }
                        
                       }}
                     />
                     <p className='input-description'>Enter a category that best describes you.</p>
                     
                     <textarea onChange={(e)=>setPageDetails({...pageDetails, bio:e.target.value})} className={darkMode ? 'dark-text dark-background-popup' : ''} placeholder='Bio (required)'  ></textarea>
                     <p className='input-description'>Tell people a little about what you do.</p>
                   
                    <input type='file' id='upload-image' onChange={handleImageChange} accept='image/*' />
                    <p className='input-description'>Upload profile for your page (optional).</p>
            </div>
            
            <div className='button-div' >
               <button onClick={createPage} disabled={!pageDetails.pagename || !pageDetails.category || !pageDetails.bio}>Create Page</button>
               <p className='input-description'>By creating a Page, you agree to the <span style={{color:'#0866ff'}}>Pages, Groups and Events Policies</span></p>
            </div>
        </div>
        <div  className={darkMode?'dark-background-popup create-page-content-main':'create-page-content-main'}>
            <div style={{height:resolution.width> 900?`${resolution.height - 104}px`:"unset"}} className={darkMode?'dark-background create-page-view':'create-page-view'}>
               <ViewPage image={image} pageDetails={pageDetails}/>
            </div>
        </div>
        
    </div>
  )
}

export default CreatePage