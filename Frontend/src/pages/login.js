import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/login.css';

function Login() {
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function loggingIn() {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: usernameState,
          password: passwordState,
        }),
      });

      if (response.ok) {
        setErrorMessage("");
        navigate('/');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Incorrect username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login.");
    }
  }

  return (
    <div className ='login-container'>
        <div className='login'>
            <h1>Log In</h1>

            <input type="text" onChange={(event) => setUsernameState(event.target.value)} />
            <input type="password" onChange={(event) => setPasswordState(event.target.value)} />

            <button onClick={loggingIn}>Submit</button>

            {errorMessage && <p>{errorMessage}</p>}
        </div>
    </div>
  );
}

export default Login;
