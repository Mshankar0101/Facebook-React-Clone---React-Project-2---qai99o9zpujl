import React,{useEffect, useState, useRef} from 'react';
import image1 from '../images/story/story1.jpg';
import image2 from '../images/story/story2.jpg';
import image3 from '../images/story/story3.jpg';
import image4 from '../images/story/story4.jpg';
import image5 from '../images/story/story5.jpg';
import image6 from '../images/story/story6.jpg';
import image7 from '../images/story/story7.jpeg';
import image8 from '../images/story/story8.jpg';
import image9 from '../images/story/story9.jpg';
import image10 from '../images/story/story10.jpg';
import profile from '../images/profile.jpg';
import '../../styles/Story.css';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useContext } from 'react';
import { GlobalContext } from '../contexts/Contexts';
import { IoMdAddCircle } from "react-icons/io";



const Story = () => {
  const imgArr = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];
  const [buttons, setButtons]= useState({prev:false,next:true});
  const storyRef= useRef();
  const {darkMode}= useContext(GlobalContext);

  useEffect(() => {
    const container = storyRef.current;
    const handleScroll = () => {
    //   console.log('container.scrollLeft',container.scrollLeft);
    //   console.log(container.scrollLeft + container.clientWidth,container.scrollWidth);

      if(container.scrollLeft === 0){
        setButtons({prev:false,next:true});
      }
      if(container.scrollLeft>0){
        setButtons((prev)=>{
          return {...prev, prev:true}
        })
      }
      if(container.scrollLeft + container.clientWidth >= container.scrollWidth){
        setButtons({prev:true,next:false});
      }
      if(container.scrollLeft + container.clientWidth < container.scrollWidth){
        setButtons((prev)=>{
          return {...prev, next:true}
        })
      }
    };
    
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  
  const showPreviousStory = ()=>{
    const container = storyRef.current;
     let width = container.clientWidth;
     container.scrollLeft = container.scrollLeft - (width*2/3);
  }
  const showNextStory = ()=>{
    const container = storyRef.current;
    let width = container.clientWidth;
    container.scrollLeft = container.scrollLeft + (width*2/3);
  }

  let profilePic;
  return (
    <div className='stories-container' ref={storyRef} >
                <div>
                    <div className='upper-div'>
                        <img alt='profile pic' src={profilePic? profilePic: profile}/>
                    </div>
                    <div className={darkMode?'dark-background lower-div':'lower-div'}>
                        <p className={darkMode?'dark-text':''} >Create story</p>
                    </div>
                    <div style={{backgroundColor:(darkMode?'rgb(50,52,54)':'#fff')}}>
                          <IoMdAddCircle className='add-icon' />
                    </div>
                </div>

                {imgArr.map((item, index)=>{
                    if(item){
                    return <div className='story-img-container' key={index} >
                              <img alt='img' src={item}/>
                          </div>
                    }else{
                        return null;
                    }
                })}

            <div className='story-next-prev'>
                <div onClick={showPreviousStory} style={{visibility:(buttons.prev?'visible':'hidden'), backgroundColor:(darkMode?'rgb(50,52,54)':'#fff')}} >
                    <GrFormPrevious className={darkMode? 'dark-next-privious-icon':'next-previous-icon'} />
                </div>

                <div onClick={showNextStory} style={{visibility:(buttons.next?'visible':'hidden'), backgroundColor:(darkMode?'rgb(50,52,54)':'#fff')}}>
                      <GrFormNext className={darkMode? 'dark-next-privious-icon':'next-previous-icon'} />
                 </div>
            </div>
    </div>
  )
}


export default Story