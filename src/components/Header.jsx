import React,{useContext, useEffect, useRef, useState} from 'react';
import '../styles/Header.css';
import { SiFacebook } from "react-icons/si";
import { FaSearch, FaMoon } from "react-icons/fa";
import {TextField, InputAdornment} from '@mui/material';
import { IoArrowBackOutline, IoLogOut } from "react-icons/io5";
import { GlobalContext } from './contexts/Contexts';
import { TbFlag3 , TbFlag3Filled} from "react-icons/tb";
import Tooltip from '@mui/material/Tooltip';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import profile from '../components/images/profile.jpg';
import { IoIosMore } from "react-icons/io";
import { PiUserSwitchFill } from "react-icons/pi";
import { RiSettings5Fill, RiFeedbackFill } from "react-icons/ri";
import { MdArrowForwardIos} from "react-icons/md";
import { IoMdHelpCircle } from "react-icons/io";


const Header = () => {
    const location = useLocation();
    const globalContext = useContext(GlobalContext);
    const {darkMode, setModalOpen, user}= globalContext;
    

    
    // pages change
    const [iconClick, setIconClick] = useState("home");
    useEffect(()=>{
        const path = location.pathname;
        if(path === '/' || path === '/home'){
            setIconClick('home');
        }else if(path === '/pages'){
            setIconClick('pages');
        }else if(path === '/video'){
            setIconClick('vedio');
        }else if(path === '/marketplace'){
            setIconClick('marketplace');
        }else if(path === '/groups'){
            setIconClick('groups');
        }
    },[location.pathname]);
    
    //right icons click
    const [rightIconsClick, setRightIconsClick] = useState({menu:false, message:false, notification:false, account:false});
    const handleIconsClick = (value)=>{
        setRightIconsClick((prev)=>{
            const newState = { menu: false, message: false, notification: false, account: false };
            newState[value] = !prev[value];
            return newState;
        })
    } 
    


    
    //   search box, menu, notification, message and account mousedoun event
    const [searchboxOpen, setSearchboxOpen]= useState(false)
    const inputRef = useRef();
    const menuRef = useRef();
    const noticicationRef = useRef();
    const messageRef = useRef();
    const accountRef = useRef();
    const rightCircularIconRef = useRef({})
    const settingRef = useRef();
    const helpRef = useRef();
    const feedbackRef = useRef();
    const displayRef = useRef();
    useEffect(()=>{
        const handleCloseAutocomplete=(e) =>{
            if(inputRef.current && !inputRef.current.contains(e.target)){
                setSearchboxOpen(false)
            }else if(menuRef.current && !menuRef.current.contains(e.target) && !rightCircularIconRef.current.menu.contains(e.target)){
                setRightIconsClick((prev)=>{
                    return {...prev, menu: false}
                })
            }else if(noticicationRef.current && !noticicationRef.current.contains(e.target) && !rightCircularIconRef.current.notification.contains(e.target)){
                setRightIconsClick((prev)=>{
                    return {...prev, notification: false}
                })
            }else if(messageRef.current && !messageRef.current.contains(e.target) && !rightCircularIconRef.current.message.contains(e.target)){
                setRightIconsClick((prev)=>{
                    return {...prev, message: false}
                })
            }else if(accountRef.current && !accountRef.current.contains(e.target) && !rightCircularIconRef.current.account.contains(e.target)){
                setRightIconsClick((prev)=>{
                    return {...prev, account: false}
                })
            }else if(settingRef.current && !settingRef.current.contains(e.target) || helpRef.current && !helpRef.current.contains(e.target) || feedbackRef.current && !feedbackRef.current.contains(e.target)){
                setShow({});
            }
        }
        document.addEventListener("mousedown",handleCloseAutocomplete);
        return () => {
            document.removeEventListener("mousedown", handleCloseAutocomplete);
            };
    },[])



    // textfield element
    const textfeild = <TextField
                    id="input-with-icon-textfield"
                    placeholder={rightIconsClick.menu?'Search menu':rightIconsClick.message?'Search Messanger':'Search'}
                    // disabled
                    sx={{
                        width: '328px',
                        ".MuiOutlinedInput-notchedOutline":{
                            border: 'none'
                        },
                        "& .MuiInputBase-root":{
                            height: '36px',
                            backgroundColor:(darkMode?'rgb(80, 86, 92)':'#e0e4eb'),
                            borderRadius:'20px',
                            color: (darkMode?'#fff':'#000'),
                            
                        },
                    }}
                    InputProps={{
                    readOnly: true,
                    type:'search',
                    startAdornment: (
                        <InputAdornment position="start">
                        <FaSearch color='#65676b' />
                        </InputAdornment>
                    ),
                    }}
                    variant="outlined"
                    />


    // navigating user based on menu click
    const navigate = useNavigate();
    const menuClick = (value)=>{
        if(value === 'friends' || value === 'pages' || value === 'groups' || value === 'pages/create'){
            setRightIconsClick((prev)=>{
                return {...prev, menu: false}
            })
            navigate('/'+value);
        }else if(value === 'create post'){
            setRightIconsClick((prev)=>{
                return {...prev, menu: false}
            })
            navigate('/home');
            setModalOpen(true)
        }
         
    }


    // account dropdown functionality
    const [show, setShow]= useState({setting:false, help:false, display:false, feedback:false});
    const handleShow = (value) =>{
        console.log("handle show", value);
         setShow((prev)=>{
            return {...prev,[value]: true}
        }) 
         setRightIconsClick((prev)=>{
            return {...prev, account: false}
        }) 
    }
    const handleHide = (value) =>{
        console.log("handle show", value);
        setShow((prev)=>{
           return {...prev,[value]: false}
       }) 
        setRightIconsClick((prev)=>{
           return {...prev, account: true}
       }) 
    }


    const logoutUser = ()=>{
        localStorage.removeItem('user');
        localStorage.removeItem('signUpUser');
        navigate('/login-signup');
    }

    let profilePic;

  return (
    <div style={{display:(location.pathname === '/login-signup'?'none':'flex')}} className={darkMode?'header dark-header-style':'header'}>
       <div className='logo-search'>
          <SiFacebook style={{height:'40px', width:'40px',color:'#0866ff',borderRadius:'50%'}} />
          <TextField
            id="input-with-icon-textfield"
            placeholder='Search Facebook'
            onFocus={()=> setSearchboxOpen(true)}
            // onBlur={()=> setSearchboxOpen(false)}
            
            sx={{
                width: {sm: '42px', md: 200, lg:240},
                ".MuiOutlinedInput-notchedOutline":{
                    border: 'none'
                },
                "& .MuiInputBase-root":{
                    height: '40px',
                    backgroundColor:(darkMode?'rgb(50,52,54)':'#e0e4eb'),
                    borderRadius:'20px',
                    color: (darkMode?'#fff':'#000')
                    
                },
            }}
            InputProps={{
            type:'search',
            startAdornment: (
                <InputAdornment position="start">
                <FaSearch color='#65676b' onClick={()=> setSearchboxOpen(true)} />
                </InputAdornment>
            ),
            }}
            variant="outlined"
          />
          {searchboxOpen && 
            <div ref={inputRef} className={darkMode?'search-feild-container dark-background-popup': 'search-feild-container'}>
                <div>
                    <IoArrowBackOutline onClick={()=> setSearchboxOpen(false)} className='back-icon' />
                    
                    <TextField
                        // id="input-with-icon-textfield"
                        placeholder='Search Facebook'
                        sx={{
                            width: '100%',
                            ".MuiOutlinedInput-notchedOutline":{
                                border: 'none'
                            },
                            "& .MuiInputBase-root":{
                                height: '40px',
                                backgroundColor:(darkMode?'rgb(50,52,54)':'#f0f2f5'),
                                borderRadius:'20px',
                                color: (darkMode?'#fff':'#000')
                            },
                            
                        }}
                        variant="outlined"
                    />
                </div>
            </div>
          }
       </div>
       <div className='header-middle'>

           <Tooltip
            title="Home">
                <NavLink className='navlink' to='/home'>
                    <div className='routes-div' >
                        {iconClick === 'home'?
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="#0866ff"  >
                                <path d="M9.464 1.286C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977zM10.5 13A1.5 1.5 0 0 0 9 14.5V21h6v-6.5a1.5 1.5 0 0 0-1.5-1.5h-3z"></path>
                            </svg>
                        :
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="#65676b" >
                                <path d="M8.99 23H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H8.99zM7.8 4.9l-2 1.5C4.15 7.638 3.61 8.074 3.317 8.658 3.025 9.242 3 9.937 3 12v4c0 1.442.002 2.424.101 3.159.095.706.262 1.033.485 1.255.223.223.55.39 1.256.485.734.099 1.716.1 3.158.1V14.5a2.5 2.5 0 0 1 2.5-2.5h3a2.5 2.5 0 0 1 2.5 2.5V21c1.443 0 2.424-.002 3.159-.101.706-.095 1.033-.262 1.255-.485.223-.222.39-.55.485-1.256.099-.734.101-1.716.101-3.158v-4c0-2.063-.025-2.758-.317-3.342-.291-.584-.832-1.02-2.483-2.258l-2-1.5c-1.174-.881-1.987-1.489-2.67-1.886C12.87 2.63 12.425 2.5 12 2.5c-.425 0-.87.13-1.53.514-.682.397-1.495 1.005-2.67 1.886zM14 21v-6.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V21h4z"></path>
                            </svg>
                        }
                    </div>
                </NavLink>
            </Tooltip>
            <Tooltip title="Pages">
                <NavLink className='navlink' to='/pages'>
                    <div className='routes-div'>
                        {iconClick === 'pages'?
                            <TbFlag3Filled style={{color:'#0866ff',height:'30px',width:'30px'}}/>
                            :
                            <TbFlag3 style={{color:'#65676b',height:'30px',width:'30px'}} />
                        }
                    </div>
                </NavLink>
            </Tooltip>
            <Tooltip title="Video">
                <NavLink className='navlink' to='video'>
                    <div className='routes-div'>
                        {iconClick === 'vedio'?
                        <svg viewBox="0 0 24 24" width="24" height="24" fill='#0866ff' >
                            <path d="M14.573 2c1.824 0 3.293 0 4.45.155 1.2.162 2.21.507 3.012 1.31.803.802 1.148 1.813 1.31 3.013.155 1.156.155 2.625.155 4.449v.146c0 1.824 0 3.293-.155 4.45-.162 1.2-.507 2.21-1.31 3.012-.802.803-1.813 1.148-3.013 1.31-1.156.155-2.625.155-4.449.155H9.427c-1.824 0-3.293 0-4.45-.155-1.2-.162-2.21-.507-3.013-1.31-.802-.802-1.147-1.813-1.309-3.013C.5 14.366.5 12.897.5 11.073v-.146c0-1.824 0-3.293.155-4.45.162-1.2.507-2.21 1.31-3.013.802-.802 1.813-1.147 3.013-1.309C6.134 2 7.603 2 9.427 2h5.146zm-3.577 6.132A1 1 0 0 0 9.5 9v4a1 1 0 0 0 1.496.868l3.5-2a1 1 0 0 0 0-1.736l-3.5-2zM7 22.5a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1z"></path>
                        </svg>
                        :
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="#65676b" >
                                <path d="M10.996 8.132A1 1 0 0 0 9.5 9v4a1 1 0 0 0 1.496.868l3.5-2a1 1 0 0 0 0-1.736l-3.5-2z"></path><path d="M14.573 2H9.427c-1.824 0-3.293 0-4.45.155-1.2.162-2.21.507-3.013 1.31C1.162 4.266.817 5.277.655 6.477.5 7.634.5 9.103.5 10.927v.146c0 1.824 0 3.293.155 4.45.162 1.2.507 2.21 1.31 3.012.802.803 1.813 1.148 3.013 1.31C6.134 20 7.603 20 9.427 20h5.146c1.824 0 3.293 0 4.45-.155 1.2-.162 2.21-.507 3.012-1.31.803-.802 1.148-1.813 1.31-3.013.155-1.156.155-2.625.155-4.449v-.146c0-1.824 0-3.293-.155-4.45-.162-1.2-.507-2.21-1.31-3.013-.802-.802-1.813-1.147-3.013-1.309C17.866 2 16.397 2 14.573 2zM3.38 4.879c.369-.37.887-.61 1.865-.741C6.251 4.002 7.586 4 9.5 4h5c1.914 0 3.249.002 4.256.138.978.131 1.496.372 1.865.74.37.37.61.888.742 1.866.135 1.007.137 2.342.137 4.256 0 1.914-.002 3.249-.137 4.256-.132.978-.373 1.496-.742 1.865-.369.37-.887.61-1.865.742-1.007.135-2.342.137-4.256.137h-5c-1.914 0-3.249-.002-4.256-.137-.978-.132-1.496-.373-1.865-.742-.37-.369-.61-.887-.741-1.865C2.502 14.249 2.5 12.914 2.5 11c0-1.914.002-3.249.138-4.256.131-.978.372-1.496.74-1.865zM8 21.5a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8z"></path>
                            </svg>
                        }
                    </div>
                </NavLink>
            </Tooltip>
            <Tooltip title="Marketplace">
                <NavLink className='navlink' to='/marketplace'>
                    <div className='routes-div' >
                        {iconClick === 'marketplace'?
                            <svg viewBox="0 0 24 24" width="24" height="24" fill='#0866ff' >
                                <path d="M4.581 1c-1.38 0-2.597.905-2.993 2.227l-.816 2.72A6.45 6.45 0 0 0 .5 7.8c0 1.425.573 2.716 1.501 3.655L2 11.5v4.57c0 1.355 0 2.471.119 3.355.124.928.396 1.747 1.053 2.403.656.657 1.475.928 2.403 1.053.884.12 2 .119 3.354.119h6.142c1.354 0 2.47 0 3.354-.119.928-.125 1.747-.396 2.403-1.053.657-.656.928-1.475 1.053-2.403.12-.884.119-2 .119-3.354V11.5l-.001-.045A5.183 5.183 0 0 0 23.5 7.8a6.47 6.47 0 0 0-.272-1.854l-.816-2.719A3.125 3.125 0 0 0 19.42 1H4.58zM20 12.716V16c0 1.442-.002 2.424-.1 3.159-.096.706-.263 1.033-.486 1.255-.222.223-.55.39-1.255.485-.551.074-1.24.094-2.159.1V17.5a2.5 2.5 0 0 0-2.5-2.5h-3A2.5 2.5 0 0 0 8 17.5v3.498c-.918-.005-1.608-.025-2.159-.099-.706-.095-1.033-.262-1.255-.485-.223-.222-.39-.55-.485-1.255C4.002 18.424 4 17.443 4 16v-3.284A5.192 5.192 0 0 0 5.7 13a5.18 5.18 0 0 0 3.15-1.062A5.18 5.18 0 0 0 12 13a5.18 5.18 0 0 0 3.15-1.062A5.18 5.18 0 0 0 18.3 13a5.2 5.2 0 0 0 1.7-.284zM14 21h-4v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V21z"></path>
                            </svg>
                            :
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="#65676b" >
                                <path d="M1.588 3.227A3.125 3.125 0 0 1 4.58 1h14.84c1.38 0 2.597.905 2.993 2.227l.816 2.719a6.47 6.47 0 0 1 .272 1.854A5.183 5.183 0 0 1 22 11.455v4.615c0 1.355 0 2.471-.119 3.355-.125.928-.396 1.747-1.053 2.403-.656.657-1.475.928-2.403 1.053-.884.12-2 .119-3.354.119H8.929c-1.354 0-2.47 0-3.354-.119-.928-.125-1.747-.396-2.403-1.053-.657-.656-.929-1.475-1.053-2.403-.12-.884-.119-2-.119-3.354V11.5l.001-.045A5.184 5.184 0 0 1 .5 7.8c0-.628.092-1.252.272-1.854l.816-2.719zM10 21h4v-3.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V21zm6-.002c.918-.005 1.608-.025 2.159-.099.706-.095 1.033-.262 1.255-.485.223-.222.39-.55.485-1.255.099-.735.101-1.716.101-3.159v-3.284a5.195 5.195 0 0 1-1.7.284 5.18 5.18 0 0 1-3.15-1.062A5.18 5.18 0 0 1 12 13a5.18 5.18 0 0 1-3.15-1.062A5.18 5.18 0 0 1 5.7 13a5.2 5.2 0 0 1-1.7-.284V16c0 1.442.002 2.424.1 3.159.096.706.263 1.033.486 1.255.222.223.55.39 1.255.485.551.074 1.24.094 2.159.1V17.5a2.5 2.5 0 0 1 2.5-2.5h3a2.5 2.5 0 0 1 2.5 2.5v3.498zM4.581 3c-.497 0-.935.326-1.078.802l-.815 2.72A4.45 4.45 0 0 0 2.5 7.8a3.2 3.2 0 0 0 5.6 2.117 1 1 0 0 1 1.5 0A3.19 3.19 0 0 0 12 11a3.19 3.19 0 0 0 2.4-1.083 1 1 0 0 1 1.5 0A3.2 3.2 0 0 0 21.5 7.8c0-.434-.063-.865-.188-1.28l-.816-2.72A1.125 1.125 0 0 0 19.42 3H4.58z"></path>
                            </svg>
                        }
                    </div>
                </NavLink>
            </Tooltip>
            <Tooltip className='navlink' title="Groups">
                <NavLink to='/groups'>
                    <div className='routes-div' >
                        {iconClick === 'groups'?
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="#0866ff" >
                                <path d="M.5 12c0 6.351 5.149 11.5 11.5 11.5S23.5 18.351 23.5 12 18.351.5 12 .5.5 5.649.5 12zm2.84-3.912A9.502 9.502 0 0 1 12 2.5a9.502 9.502 0 0 1 8.66 5.588 4.001 4.001 0 0 0 0 7.824 9.514 9.514 0 0 1-1.755 2.613A5.002 5.002 0 0 0 14 14.5h-4a5.002 5.002 0 0 0-4.905 4.025 9.515 9.515 0 0 1-1.755-2.613 4.001 4.001 0 0 0 0-7.824zM8 9a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"></path>
                            </svg>
                            :
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="#65676b">
                                <path d="M.5 12c0 6.351 5.149 11.5 11.5 11.5S23.5 18.351 23.5 12 18.351.5 12 .5.5 5.649.5 12zm2 0c0-.682.072-1.348.209-1.99a2 2 0 0 1 0 3.98A9.539 9.539 0 0 1 2.5 12zm.84-3.912A9.502 9.502 0 0 1 12 2.5a9.502 9.502 0 0 1 8.66 5.588 4.001 4.001 0 0 0 0 7.824 9.514 9.514 0 0 1-1.755 2.613A5.002 5.002 0 0 0 14 14.5h-4a5.002 5.002 0 0 0-4.905 4.025 9.515 9.515 0 0 1-1.755-2.613 4.001 4.001 0 0 0 0-7.824zM12 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm-2 4a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm11.291 1.01a9.538 9.538 0 0 1 0 3.98 2 2 0 0 1 0-3.98zM16.99 20.087A9.455 9.455 0 0 1 12 21.5c-1.83 0-3.54-.517-4.99-1.414a1.004 1.004 0 0 1-.01-.148V19.5a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v.438a1 1 0 0 1-.01.148z"></path>
                            </svg>
                        }
                    </div>
                </NavLink>
            </Tooltip>

       </div>
       <div className='header-right'>
            <Tooltip title="Menu">
                <div  ref={(el) => (rightCircularIconRef.current.menu = el)} onClick={()=>handleIconsClick("menu")} className={darkMode?"dark-background header-right-circular":"header-right-circular"}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill={rightIconsClick.menu? "#0866ff":'#000'} >
                        <path d="M18.5 1A1.5 1.5 0 0 0 17 2.5v3A1.5 1.5 0 0 0 18.5 7h3A1.5 1.5 0 0 0 23 5.5v-3A1.5 1.5 0 0 0 21.5 1h-3zm0 8a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 21.5 9h-3zm-16 8A1.5 1.5 0 0 0 1 18.5v3A1.5 1.5 0 0 0 2.5 23h3A1.5 1.5 0 0 0 7 21.5v-3A1.5 1.5 0 0 0 5.5 17h-3zm8 0A1.5 1.5 0 0 0 9 18.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm8 0a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm-16-8A1.5 1.5 0 0 0 1 10.5v3A1.5 1.5 0 0 0 2.5 15h3A1.5 1.5 0 0 0 7 13.5v-3A1.5 1.5 0 0 0 5.5 9h-3zm0-8A1.5 1.5 0 0 0 1 2.5v3A1.5 1.5 0 0 0 2.5 7h3A1.5 1.5 0 0 0 7 5.5v-3A1.5 1.5 0 0 0 5.5 1h-3zm8 0A1.5 1.5 0 0 0 9 2.5v3A1.5 1.5 0 0 0 10.5 7h3A1.5 1.5 0 0 0 15 5.5v-3A1.5 1.5 0 0 0 13.5 1h-3zm0 8A1.5 1.5 0 0 0 9 10.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 13.5 9h-3z"></path>
                    </svg>
               </div>
            </Tooltip>
            <Tooltip title="Messanger">
                <div ref={(el) => (rightCircularIconRef.current.message = el)} onClick={()=>handleIconsClick("message")} className={darkMode?"dark-background header-right-circular":"header-right-circular"}>
                    <svg viewBox="0 0 12 13" width="20" height="20" fill={rightIconsClick.message? "#0866ff":'#000'} ><g fill-rule="evenodd" transform="translate(-450 -1073)">
                        <path d="m459.603 1077.948-1.762 2.851a.89.89 0 0 1-1.302.245l-1.402-1.072a.354.354 0 0 0-.433.001l-1.893 1.465c-.253.196-.583-.112-.414-.386l1.763-2.851a.89.89 0 0 1 1.301-.245l1.402 1.072a.354.354 0 0 0 .434-.001l1.893-1.465c.253-.196.582.112.413.386M456 1073.5c-3.38 0-6 2.476-6 5.82 0 1.75.717 3.26 1.884 4.305.099.087.158.21.162.342l.032 1.067a.48.48 0 0 0 .674.425l1.191-.526a.473.473 0 0 1 .32-.024c.548.151 1.13.231 1.737.231 3.38 0 6-2.476 6-5.82 0-3.344-2.62-5.82-6-5.82">
                        </path></g>
                    </svg>
               </div>
            </Tooltip>
            <Tooltip title="Notifications">
                <div ref={(el) => (rightCircularIconRef.current.notification = el)} onClick={()=>handleIconsClick("notification")} className={darkMode?"dark-background header-right-circular":"header-right-circular"}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill={rightIconsClick.notification? "#0866ff":'#000'} >
                        <path d="M3 9.5a9 9 0 1 1 18 0v2.927c0 1.69.475 3.345 1.37 4.778a1.5 1.5 0 0 1-1.272 2.295h-4.625a4.5 4.5 0 0 1-8.946 0H2.902a1.5 1.5 0 0 1-1.272-2.295A9.01 9.01 0 0 0 3 12.43V9.5zm6.55 10a2.5 2.5 0 0 0 4.9 0h-4.9z"></path>
                    </svg>
                </div>
            </Tooltip>
            <Tooltip title="Account">
                <div ref={(el) => (rightCircularIconRef.current.account = el)} onClick={()=>handleIconsClick("account")} className={darkMode?"dark-background header-right-circular":"header-right-circular"}>
                    <img alt='profile' src={profilePic? profilePic: profile} />
                </div>
            </Tooltip>

       </div>
       {
            rightIconsClick.menu?
            <div ref={menuRef} className={darkMode?'dark-background-popup dark-text header-right-menu':'header-right-menu'}>
                 <p>Menu</p>
                 <div className='flex-menu'>
                    <div>
                        <div className='search'>
                            {textfeild}
                        </div>
                        <div className='item-div'>
                            <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/qfMB40PdgWb.png' alt='event'/>
                            <div>
                                <p>Events</p>
                                <p>Organize or find events and other things to do online and nearby.</p>
                            </div>
                        </div>
                        <div style={{cursor:'pointer'}} onClick={()=>menuClick('friends')} className='item-div'>
                            <img src='https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/i0pziEs5Wj6.png' alt='friends'/>
                            <div>
                                <p>Friends</p>
                                <p>Search for friends or people you may know.</p>
                            </div>
                        </div>
                        <div style={{cursor:'pointer'}} onClick={()=>menuClick('groups')} className='item-div'>
                            <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/MhkwI3R0SHP.png' alt='groups'/>
                            <div>
                                <p>Groups</p>
                                <p>Connect with people who share your interests.</p>
                            </div>
                        </div>
                        <div className='item-div'>
                            <img src='https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/-6zDH4i8Hrw.png' alt='news feed'/>
                            <div>
                                <p>News Feed</p>
                                <p>See relevant posts from people and Pages you follow.</p>
                            </div>
                        </div>
                        <div className='item-div'>
                            <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/eECk3ceTaHJ.png' alt='feed'/>
                            <div>
                                <p>Feed</p>
                                <p>See the most recent posts from your friends, groups, Pages and more</p>
                            </div>
                        </div>
                        <div style={{cursor:'pointer'}} onClick={()=>menuClick('pages')} className='item-div'>
                            <img src='https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/7RdHDScIkAe.png' alt='pagess'/>
                            <div>
                                <p>Pages</p>
                                <p>Discover and connect with businesses on Facebook.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p>Create</p>
                         <div style={{cursor:'pointer'}}  onClick={()=>menuClick("create post")} className='item-div'>
                             <div className='circular-icon-div'>
                                  <div className='icon icon1'></div>
                             </div>
                             <p>Post</p>
                         </div>
                         <div style={{cursor:'pointer'}} onClick={()=> menuClick("pages/create")} className='item-div'>
                             <div className='circular-icon-div'>
                                  <div className='icon icon2'></div>
                             </div>
                             <p>Page</p>
                         </div>
                         <div className='item-div'>
                             <div className='circular-icon-div'>
                                  <div className='icon icon3'></div>
                             </div>
                             <p>Story</p>
                         </div>
                         <div className='item-div'>
                             <div className='circular-icon-div'>
                                  <div className='icon icon4'></div>
                             </div>
                             <p>Reel</p>
                         </div>
                         <div className='item-div'>
                             <div className='circular-icon-div'>
                                  <div className='icon icon5'></div>
                             </div>
                             <p>Ad</p>
                         </div>
                    </div>
                 </div>
            </div>

            :

            rightIconsClick.notification?
            <div ref={noticicationRef} className={darkMode?'dark-background-popup dark-text header-right-notificaton':'header-right-notificaton'}>
                 <div className='space-between'>
                    <p>Notification</p>
                    <IoIosMore className='more-icon'/>
                 </div>
                 <div>
                    <span>All</span>
                    <span>Unread</span>
                 </div>
                 <div className='space-between'>
                    <span>Earlier</span>
                    <span style={{color:'#0866ff'}}>See all</span>
                 </div>
                 <p>There is no notification to show.</p>
                 
            </div>

            :

            rightIconsClick.message?
            <div ref={messageRef} className={darkMode?'dark-background-popup dark-text header-right-message':'header-right-message'}>
                 <div className='space-between'>
                    <p>Chats</p>
                    <IoIosMore className='more-icon'/>
                 </div>
                 <div>
                    {textfeild}
                 </div>
                 <p>There is no any available chat.</p>
            </div>

            :
            rightIconsClick.account?
            <div ref={accountRef} className={darkMode? 'dark-background-popup dark-text header-right-account':'header-right-account'}>
                 <div className={darkMode?'dark-background profile-seeall':'profile-seeall'}>
                    <div>
                        <div>
                           <img alt='profile' src={profilePic? profilePic: profile} />
                        </div>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <div style={{backgroundColor:(darkMode?"#67696b":"rgb(228, 230, 235)")}} className='switch-profile'>
                            <PiUserSwitchFill className='switch' />
                            <p>See all profiles</p>
                        </div>
                    </div>
                 </div>

                 <div onClick={()=>handleShow("setting")} className='account-option'>
                    <div>
                        <div className='header-right-circular'>
                          <RiSettings5Fill className='account-option-icons'/>
                        </div>
                        <span>Settings & privacy</span>
                    </div>
                    <MdArrowForwardIos style={{opacity:'0.4'}} className='account-forward-icons' />
                 </div>

                 <div onClick={()=>handleShow("help")} className='account-option'>
                    <div>
                        <div className='header-right-circular'>
                          <IoMdHelpCircle className='account-option-icons'/>
                        </div>
                        <span>Help & support</span>
                    </div>
                    <MdArrowForwardIos style={{opacity:'0.4'}} className='account-forward-icons' />
                 </div>

                 <div onClick={()=>handleShow("display")} className='account-option'>
                    <div>
                        <div className='header-right-circular'>
                          <FaMoon className='account-option-icons'/>
                        </div>
                        <span>Display & accessibility</span>
                    </div>
                    <MdArrowForwardIos style={{opacity:'0.4'}} className='account-forward-icons' />
                 </div>

                 <div onClick={()=>handleShow("feedback")} className='account-option'>
                    <div>
                        <div className='header-right-circular'>
                          <RiFeedbackFill className='account-option-icons'/>
                        </div>
                        <span>Give feedback</span>
                    </div>
                 </div>

                 <div className='account-option'>
                    <div onClick={logoutUser}>
                        <div className='header-right-circular'>
                          <IoLogOut className='account-option-icons'/>
                        </div>
                        <span>Log out</span>
                    </div>
                 </div>

                 <div style={{padding: '4px 8px'}}>
                    <span style={{color:darkMode?'#fff':'rgb(101, 103, 107)'}} className='bottom-text'>Privacy · Terms · Advertising · Ad Choices · Cookies · more · Meta © 2024</span>
                 </div>

            </div>
            :null    
       }

       {
        show.setting?
        <div ref={settingRef} className={darkMode?"dark-background-popup dark-text user-setting":"user-setting"}>
            <div>
                <IoArrowBackOutline onClick={()=> handleHide("setting")} className='back-icon' />
                <p>Setting & privacy</p>
            </div>
             <p>This feature is comming soon!!</p>
        </div>:
        show.help?
        <div ref={helpRef} className={darkMode?"dark-background-popup dark-text help-support":"help-support"}>
             <div>
                <IoArrowBackOutline onClick={()=> handleHide("help")} className='back-icon' />
                <p>Help & support</p>
            </div>
             <p>This feature is comming soon!!</p>
        </div>:
        show.display?
        <div ref={displayRef} className={darkMode?"dark-background-popup dark-text display-accessibility":"display-accessibility"}>
             <div>
                <IoArrowBackOutline onClick={()=> handleHide("display")} className='back-icon' />
                <p>Display & accessibility</p>
            </div>
        </div>:
        show.feedback?
        <div ref={feedbackRef} className={darkMode?"dark-background-popup dark-text give-feedback":"give-feedback"}>
            <div>
                <IoArrowBackOutline onClick={()=> handleHide("feedback")} className='back-icon' />
                <p>Give feedback</p>
            </div>
             <p>This feature is comming soon!!</p>
        </div>
        :null

       }
    </div>
  )
}

export default Header