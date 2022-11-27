import React,{useState ,useRef} from 'react'
import '../landingPage.css'
import {default as api} from '../store/apiSlice'
import {useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [login ,setLog]=useState(true)
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [addUser]= api.useAddUserMutation()
    const [confirmUser]= api.useConfirmUserMutation()
    const navigate = useNavigate()
    const myStorage = window.localStorage;
    //
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    //
    const userNameLogRef = useRef();
    const passwordLogRef = useRef();
   
    const handleSubmit = async (e) => {
        const newUser = {
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        };
    
        try {
          await addUser(newUser).unwrap();
          setError(false);
          setSuccess(true);
        } catch (err) {
          setError(true);
          setSuccess(false);
        }
      };

      const submitLogin = async (e) => {
        const user = {
          username: userNameLogRef.current.value,
          password: passwordLogRef.current.value,
        };
        try {
          const res = await confirmUser(user);
          console.log(res.data);
          const currentUser = res.data.username
          myStorage.setItem('user', currentUser);
          navigate(`/exTracker/${currentUser}`)
        //   setShowLogin(false)
        //   window.location.reload(false)
      } catch (err) {
          setError(true);
          throw err
        }
      };
  

  return (
    <div class='x' >
    
    
    <div class="landing-container">
  
    
        <div class=""></div>
        <div class="btn">
            <button class="login"  onClick={()=>setLog(true)}>Login</button>
            <button class="signup" onClick={()=>setLog(false)}>Signup</button>
        </div>
  
        <div class="form-section">
  
             {login  && (

                 
            <div class="login-box">
                <input type="email" 
                       class="email ele" 
                       placeholder="youremail@email.com"
                       ref={userNameLogRef}
                      />
                <input type="password"
                       class="password ele" 
                       placeholder="password"
                       ref={passwordLogRef}/>
                <button class="clkbtn" onClick={submitLogin}>Login</button>
            </div>
                       )}
  
            
            {!login && (

                <div class="signup-box">
                <input 
                autoFocus
                      type="text" 
                       class="name ele" 
                       placeholder="Enter your name"
                       ref={usernameRef} />
                <input type="email" 
                       class="email ele" 
                       placeholder="youremail@email.com"  ref={emailRef}/>
                <input type="password" 
                       class="password ele" 
                       placeholder="password"
                       ref={passwordRef}/>
                <button class="clkbtn" onClick={handleSubmit}>Signup</button>
                {success && (
          <span className="success">Successfull. You can login now!</span>
        )}
        {error && <span className="failure">Something went wrong!</span>}
            </div>
                       )}
            
        </div>
    </div>


    </div>
  )
}

export default LandingPage