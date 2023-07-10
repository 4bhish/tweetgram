import React, { useContext, useState } from 'react'
import cloneDeep from 'lodash.clonedeep';

import '../styles/LandingPage.css'
import { LoginContext } from '../LoginProvider'
import { userDetailProvider } from '../contexts/UserDetailContext'




function LandingPage() {

    const {setLoginStatus}  = useContext(LoginContext)

    const [showSignup,setShowSignup] = useState(false)

    const [signupDetails,setSignupDetails] = useState({
      firstName:"",
      lastName:"",
      username:"",
      email:"",
      password:"",
      imgSrc:'',
      link:''
    })

    const [signinDetails,setSigninDetails] = useState({
      username:"",
      password:""
    })


    const handleSignup = async() => {
      try{

        const res = await  fetch('/api/auth/signup',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupDetails)
        })

          const response = await res.json()
          localStorage.setItem("token", response.encodedToken);
  
          const clonedUser = cloneDeep(response.createdUser);
          localStorage.setItem('user', JSON.stringify(clonedUser));
  
          setLoginStatus(true) 
      }
      catch(e){
        console.error(e)
      }
      
      setSignupDetails({
        firstName:"",
      lastName:"",
      username:"",
      email:"",
      password:"",
      })
    }

    const handleSignIn = async() => {
      try{

        const res = await  fetch('/api/auth/login',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signinDetails)
        })

        if(res.status === 200){

        const response = await res.json()
        localStorage.setItem("token", response.encodedToken);

        const clonedUser = cloneDeep(response.foundUser);
        localStorage.setItem('user', JSON.stringify(clonedUser));

        setLoginStatus(true)
        } 
        
        else{
          console.log("Unauthorized user or login details")
        }

      }
      catch(e){
        console.error()
      }
   

    }

    
  return (
    <div className="landingpage">
      <div className="img__container">
       <h1 style={{color:"white",fontSize:"120px",fontFamily:'monospace'}}>T.</h1>
      </div>
      <div className="login__container">
        
        {showSignup ? (
          <div className="signup__container">  
              <h1>Tweetgram</h1>
            <input type="text" placeholder="Enter your First Name" value={signupDetails.firstName}  onChange={(e) => setSignupDetails(prevState => ({
              ...prevState,
              firstName:e.target.value
            }))}/>

            <input type="text" placeholder="Enter your Last Name" value={signupDetails.lastName} onChange={(e) => setSignupDetails(prevState => ({
              ...prevState,
              lastName:e.target.value
            }))} />

            <input type="text" placeholder="Enter Profile Picture URL" value={signupDetails.imgSrc} onChange={(e) => setSignupDetails(prevState => ({
              ...prevState,
              imgSrc:e.target.value
            }))} />
            
            <input type="text" placeholder="Enter Portfolio URL" value={signupDetails.link} onChange={(e) => setSignupDetails(prevState => ({
              ...prevState,
              link:e.target.value
            }))} />

            <input type="text" placeholder="Enter your username" value={signupDetails.username} onChange={(e) => setSignupDetails(prevState => ({
              ...prevState,
              username:e.target.value
            }))} />

            <input type="email" placeholder="Enter your Email" value={signupDetails.email} onChange={(e) => setSignupDetails(prevState => ({
              ...prevState,
              email:e.target.value
            }))} />

            <input type="password" placeholder="Enter a password" value={signupDetails.password} onChange={(e) => setSignupDetails(prevState => ({
              ...prevState,
              password:e.target.value
            }))} />
            <button type='submit'  onClick={handleSignup}>Sign Up</button>
            <p>
              Already have an account?{' '}
              <span onClick={() => setShowSignup(false)}>Sign In</span>
            </p>
          </div>
        ) : (
          <div className="signin__container">
             <h1>Tweetgram</h1>
            <input type="text" placeholder="Enter your Email" value={signinDetails.email} onChange={(e) => setSigninDetails(prevState => ({
              ...prevState,
              username:e.target.value
            }))} />
            <input type="password" placeholder="Enter a password" value={signinDetails.password} onChange={(e) => setSigninDetails(prevState => ({
              ...prevState,
              password:e.target.value
            }))} />
            <button onClick={handleSignIn}>Sign In</button>
            <p>
              Don't have an account?{' '}
              <span onClick={() => setShowSignup(true)}>Sign Up</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LandingPage
