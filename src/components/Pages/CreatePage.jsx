import React,{useContext, useState} from 'react'
import { GlobalContext } from '../contexts/Contexts';
import { TextField } from '@mui/material';

const CreatePage = () => {
    const {darkMode, resolution, user}=useContext(GlobalContext);


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

  return (
    <div style={{height:resolution.width> 900?`${resolution.height - 56}px`:"unset"}} className={darkMode?'dark-parent dark-text create-page':'create-page'}>
        <div style={{height:resolution.width> 900?`${resolution.height - 56}px`:"unset"}} className={darkMode?'.dark-header-style create-page-sidebar':'create-page-sidebar'}>
            <p>Pages &gt; Create a page</p>
            <p>Create a Page</p>
            <p>Your Page is where people go to learn more about you. Make sure yours has all the information they may need.</p>
            <div className='scroll-div'>
                   <TextField fullWidth id="outlined-basic" placeholder="Page name (required)" variant="outlined" 
                    //    value={loginDetails.email} 
                    //    onChange={(e)=>{
                    //     setLoginDetails({...loginDetails, email:e.target.value})
                    //    }}
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
                    //    value={loginDetails.email} 
                    //    onChange={(e)=>{
                    //     setLoginDetails({...loginDetails, email:e.target.value})
                    //    }}
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
                     
                     <textarea className={darkMode ? 'dark-text dark-background-popup' : ''} placeholder='Bio (optional)'  ></textarea>
                     <p className='input-description'>Tell people a little about what you do.</p>
                   
                    <input type='file' id='upload-image' onChange={handleImageChange} accept='image/*' />
                    <p className='input-description'>Upload profile for your page (optional).</p>
            </div>
            
            <div className='button-div' >
               <button>Create Page</button>
               <p className='input-description'>By creating a Page, you agree to the <span style={{color:'#0866ff'}}>Pages, Groups and Events Policies</span></p>
            </div>
        </div>
        <div className='create-page-content-main'>
            <div className={darkMode?'dark-background create-page-view':'create-page-view'}>

            </div>
        </div>
        
    </div>
  )
}

export default CreatePage