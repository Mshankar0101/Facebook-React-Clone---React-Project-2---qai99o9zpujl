import React,{useContext, useState} from 'react'
import { GlobalContext } from '../contexts/Contexts';

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
    <div style={{height:resolution.width> 900?`${resolution.height - 56}px`:"unset"}} className={darkMode?'dark-parent dark-text creat-page':'creat-page'}>
        <div style={{height:resolution.width> 900?`${resolution.height - 56}px`:"unset"}} className={darkMode?'.dark-header-style create-page-sidebar':'create-page-sidebar'}>

        </div>
        <div className='create-page-content-main'>
            <div className={darkMode?'dark-background create-page-view':'create-page-view'}>

            </div>
        </div>
        
    </div>
  )
}

export default CreatePage