import React,{useRef,useState} from 'react'
import "../register.css"
import {default as api} from '../store/apiSlice'

const Register = () => {
  const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
  const [addUser] = api.useAddUserMutation();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    console.log(newUser);
    if(!newUser) return setError(true);
      await addUser(newUser).unwrap();
      setSuccess(true);
   
  }
  return (
    <>
          <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>

     <form
           onSubmit={handleSubmit}
           >
     <h3>Register Here</h3>

<label for="username">Username</label>
<input  placeholder="Username" id="username" ref={usernameRef}/>

<label for="Email">Email</label>
<input type="email" placeholder="Email" id="Email" ref={emailRef}/>

<label for="password">Password</label>
<input  type="password"  min="6" placeholder="password" id="password" ref={passwordRef}/>

<button  type="submit">
          Register
        </button>
        {success && (
          <span className="success">Successfull. You can login now!</span>
        )}
        {error && <span className="failure">Something went wrong!</span>}
<div class="social">
  <div class="go"><i class="fab fa-google"></i>  Google</div>
  <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div>
</div>
     </form>

    </>
  )

}

export default Register
