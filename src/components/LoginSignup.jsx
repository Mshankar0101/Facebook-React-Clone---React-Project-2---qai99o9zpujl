import React, { useContext, useEffect, useState } from "react";
import '../styles/LoginSignup.css';
import { GlobalContext } from "./contexts/Contexts";
import{Modal, TextField} from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const LoginSignup = ()=>{
    const {darkMode, resolution, setUser}= useContext(GlobalContext);
    const navigate = useNavigate()

    const [openSignup, setOpenSignup]=useState(false);
    const handleClose = ()=> setOpenSignup(true);

     const monthsArr = ["Jan","Feb","Mar","Apr", "May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
     const currentYear = new Date().getFullYear()+1;



    //  handling signup
    const [signupDetails, setSignupDetails]= useState({});
    const [dateOfBirth, setDateOfBirth]= useState({day:'1',month:'Jan',year:'2024'});
    const [alertMessage, setAlertMessage]= useState('');

    function isValidEmail(email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
     }


    const handleSignupDetails = (e)=>{
         const {name} = e.target;
         if(name === "gender"){
             setSignupDetails({...signupDetails, gender: e.target.value});
         }else{
            setSignupDetails((prev)=>{ 
              return {...prev, [name]: e.target.value};
            })
         }
    }

    const signup = ()=>{ 
      const myHeaders = new Headers();
      myHeaders.append("projectID", "ktu17k7gadkn");
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        "name": signupDetails.firstName.trim() +" "+signupDetails.lastName.trim(),
        "email": signupDetails.email,
        "password": signupDetails.password,
        "appType": "facebook"
      });
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };
      
      fetch("https://academics.newtonschool.co/api/v1/user/signup", requestOptions)
      .then((response) => {
        if (!response.ok) {
          if(response.status === 403){
            setAlertMessage("Email already exists");
            
          }else{
            setAlertMessage("Failed to signup");
           
          }
        }
            return response.json();
        })
        .then((result) => {
           if(result.status !== "fail"){
             console.log(result);
             const signUpUser = {...signupDetails,'fbToken':result.token, dob: dateOfBirth };
             console.log("signUpUser",signUpUser);
             localStorage.setItem('signUpUser',JSON.stringify(signUpUser));
             setUser(signUpUser);
             setAlertMessage('');
             setOpenSignup(false); 
           }
        })
        .catch((error) => {
            console.error("Error:", error.message);
            alert(`An error occurred: ${error.message}`);
        });
    }

    const handleSignup = ()=>{
      !signupDetails.firstName? setAlertMessage("Please enter your First Name"): !signupDetails.lastName? setAlertMessage("Please enter your Surname"):
      !signupDetails.email? setAlertMessage("Please enter your Email"):!isValidEmail(signupDetails.email)? setAlertMessage("Please enter a valid Email"): !signupDetails.password? setAlertMessage("Please set your password"):
      signupDetails.password.length < 6 ? setAlertMessage("Password must be at least 6 characters long"):
      (!signupDetails.gender && !signupDetails.gender && !signupDetails.gender) ? setAlertMessage("Please select your gender"): 
      !dateOfBirth.day ? setAlertMessage("Please select your day of birth"): !dateOfBirth.month? setAlertMessage("Please select your month of birth"): !dateOfBirth.year? setAlertMessage("Please select your birth year"): signup()
    }




    // handling login 
     const [loginDetails, setLoginDetails]= useState({email:'', password:''});
     const [loginAlertMsg, setLoginAlertMsg]= useState('');
     const handleLogin = ()=>{
         if(!loginDetails.email){
          setLoginAlertMsg("Please enter your Email");
         }else if(!isValidEmail(loginDetails.email)){
          setLoginAlertMsg("Please enter a valid Email");
         }else if(!loginDetails.password){
          setLoginAlertMsg("Please enter your Password");
         }else{
              const myHeaders = new Headers();
              myHeaders.append("projectID", "ktu17k7gadkn");
              myHeaders.append("Content-Type", "application/json");
              
              const raw = JSON.stringify({
                "email": loginDetails.email,
                "password": loginDetails.password,
                "appType": "facebook"
              });
              
              const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
              };
              
              fetch("https://academics.newtonschool.co/api/v1/user/login", requestOptions)
              .then((response) => {
                  console.log(response);
                  if (!response.ok) {
                      if(response.status === 401){
                        setLoginAlertMsg("Invalid Email or Password.");
                        return null;
                      }else{
                        setLoginAlertMsg("An error occurred, Please try again.");
                        return null;
                      }
                      // throw new Error(`HTTP error! Status: ${response.status}`);
                      // setLoginAlertMsg(`HTTP error! Status: ${response.status}`);
                  }
                    return response.json();
                 
                })
                .then((result) => {
                    if(!result){
                          console.log('Response was not OK, stopping execution.');
                          return;
                    }
                    console.log(result);
                    const user = {'fbToken':result.token, name:result.data.user.name, email:result.data.user.email, id:result.data.user._id };
                    console.log("user",user);
                    localStorage.setItem('user',JSON.stringify(user));
                    setUser(user);
                    setLoginAlertMsg('');
                    navigate("/");
                })  
                .catch((error) => {
                    console.error("Error:", error.message);
                    alert(`An error occurred: ${error.message}`);
                });
         }
     }








    useEffect(()=>{
       console.log(loginDetails);
    },[loginDetails])


    return(
        <div className={darkMode?"dark-parent login-signup-page": "login-signup-page"}>
            <div className="margin-div">
                <div className="logo-text">
                    <img src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="fb_logo"/>
                    <p style={{color:darkMode?'#fff':'#1C1E21', fontSize:(resolution.width< 600 ? '18px': resolution.width< 1100? '24px': '28px')}}>Facebook helps you connect and share with the people in your life.</p>
                </div>
                <div className={darkMode?"dark-header-style login-container":'login-container'}>
                     <TextField fullWidth id="outlined-basic" placeholder="Email address" variant="outlined" 
                       value={loginDetails.email} 
                       onChange={(e)=>{
                        setLoginDetails({...loginDetails, email:e.target.value})
                       }}
                       sx={{
                        marginBottom:'12px',

                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: '#dddfe2', // Initial border color (remove hover outline)
                          },
                          "&:hover fieldset": {
                            borderColor: '#dddfe2', // Remove hover outline
                          },
                          "&.Mui-focused fieldset": {
                            border: '1px solid #0866ff', // Focused border color
                          },
                          height: '52px',
                          backgroundColor: darkMode ? 'rgb(50,52,54)' : '#fff',
                          borderRadius: '6px',
                          color: darkMode ? '#fff' : '#1d2129',
                        }
                        
                       }}
                     />
                     <TextField fullWidth id="outlined-basic" placeholder="Password" variant="outlined" 
                       type="password"
                       value={loginDetails.password}
                       onChange={(e)=>{
                        setLoginDetails({...loginDetails, password:e.target.value})
                       }}
                       sx={{
                        marginBottom:'15px',
                        
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: '#dddfe2', // Initial border color (remove hover outline)
                          },
                          "&:hover fieldset": {
                            borderColor: '#dddfe2', // Remove hover outline
                          },
                          "&.Mui-focused fieldset": {
                            border: '1px solid #0866ff', // Focused border color
                          },
                          height: '52px',
                          backgroundColor: darkMode ? 'rgb(50,52,54)' : '#fff',
                          borderRadius: '6px',
                          color: darkMode ? '#fff' : '#1d2129',
                        }
                       }}
                     />
                     {loginAlertMsg? <p style={{margin:'0px 0px 4px',fontWeight:'500',color:'red',textAlign:'center'}} >{loginAlertMsg} !!</p> : null}
                     <button onClick={handleLogin} className="login-btn">Log in</button>

                     <div className="forgot-password">
                        <p>Forgotten Password?</p>
                     </div>
                     
                     <div className="create-account-div">
                       <button onClick={()=>setOpenSignup(true)} className="create-account-btn">Create new account</button>
                     </div>

                </div>
            </div>
            {
                openSignup && 
                <Modal
                 open={openSignup}
                 onClose={handleClose}
                 slotProps={{
                    backdrop:{
                        style:{backgroundColor:darkMode?'rgba(0, 0, 0, 0.6)': 'rgba(255,255,255,0.6)'}
                    }
                }}
                sx={{overflowY: 'auto' }}
                >
                    <div className={darkMode?"dark-background-popup dark-signup-color create-account-Modal":'create-account-Modal'}>
                        <div className="modal-heading">
                            <div>
                              <h1 style={{color:darkMode?'#fff':'#1C1E21'}}>Sign Up</h1>
                              <span>It's quick and easy</span>
                            </div>
                            <RxCross2 onClick={()=> setOpenSignup(false)} className="cross-icon"/>
                        </div>
                        <div className="user-details">
                           <div className="user-name">
                               <input onChange={handleSignupDetails} type="text" name="firstName" placeholder="First Name" className="user-name-input"/>
                               <input onChange={handleSignupDetails} type="text" name="lastName" placeholder="Surname" className="user-name-input"/>
                           </div>

                           <input onChange={handleSignupDetails} style={{marginBottom:'10px'}} type="email" name="email" placeholder="Email address" className="user-name-input"/>
                           <input onChange={handleSignupDetails} type="password" placeholder="New password" name="password" className="user-name-input"/>

                           <div className="date-of-birth">
                              <div>
                                  <p>Date of birth</p>
                                  <div>?</div>
                              </div>

                              <div>

                                  <select onChange={(e)=>
                                    setDateOfBirth({...dateOfBirth, day:e.target.value})
                                  } >
                                        {
                                          Array.from({length: 31}, (_, i) => i+1).map((item, index)=>{
                                            return <option key={index}>{item}</option>
                                          })
                                        }
                                  </select>
                                  <select onChange={(e)=>
                                    setDateOfBirth({...dateOfBirth, month:e.target.value})
                                  }
                                  >
                                        {
                                          monthsArr.map((item, index)=>{
                                            return <option key={index}>{item}</option>
                                          })
                                        }
                                  </select>
                                  <select onChange={(e)=>
                                    setDateOfBirth({...dateOfBirth, year:e.target.value})
                                  }
                                  >
                                        {
                                         
                                          Array.from({length: 120}, (_, i) => currentYear - (i+1)).map((item, index)=>{
                                              return <option key={index}>{item}</option>

                                          })
                                        }
                                  </select>
                              </div>

                           </div>

                           <div className="gender">
                                  <div>
                                      <p>Gender</p>
                                      <div>?</div>
                                  </div>
                                  <div>
                                     <div>
                                        <span>Female</span>
                                        <input onChange={handleSignupDetails} type="radio"  name="gender" value="female"/>
                                     </div>
                                     <div>
                                        <span>Male</span>
                                        <input onChange={handleSignupDetails} type="radio" name="gender" value="male"/>
                                     </div>
                                     <div>
                                        <span>Custom</span>
                                        <input onChange={handleSignupDetails} type="radio" name="gender"  value="custom"/>
                                     </div>
                                  </div>
                            </div>

                              <p className="signup-text1">People who use our service may have uploaded your contact information to Facebook. <b>Learn more.</b></p>
                              <p className="signup-text2">By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</p>
                              {alertMessage? <p style={{margin:'2px 0px',fontWeight:'500',color:'red',textAlign:'center'}} >{alertMessage} !!</p> : null}
                              <div className="signup-btn-div">
                                <button onClick={handleSignup}>Sign Up</button>
                              </div>
                       </div>
                    </div>
                </Modal>
            }
        </div>
    )
}
export default LoginSignup;