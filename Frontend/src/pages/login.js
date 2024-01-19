import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/login.css'

/*Gabe you need to add the google sheet login column to the username variable*/
function Login() {
  const username = "SACelections";
  const password = "SACelections";

  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  function loggingIn() {
    if (usernameState === username && passwordState === password) {
      setLoggedIn(true);
      setErrorMessage("");
      navigate('/');
    } else {
      setErrorMessage("Incorrect username or password");
    }
  }

  return (
    <div className ='login-container'>
        <div className='login'>
            <h1>Log In</h1>

            <input type="text" onChange={(event) => 
                setUsernameState(event.target.value)
            } />

            <input type="password" onChange={(event) => 
                setPasswordState(event.target.value)
            } />

            <button onClick={loggingIn}>Submit</button>

            {errorMessage && <p>{errorMessage}</p>}
        </div>
    </div>
  );
}

export default Login
