import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './SignIn.css';  
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpData, setSignUpData] = useState({
    username: '',
    password: ''
  });


  const handleInputChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUpSubmit = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/user/create', 
         signUpData, {
          headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
          },
        }
      );
      console.log(response);
      } catch (error) {
        console.log(error)
      }
  };

  const handleSignUpClick = () => {
    setIsActive(true);
  };
  
  const handleSignInClick = () => {
    setIsActive(false);
  };
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickLogin = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/token',
        data: qs.stringify({
          username: username,
          password: password,
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      });

      navigate('/admin', { 
        state: { 
          token: response.data.access_token
        } 
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <>
      <div className={`myAuth-container ${isActive ? 'active' : ''}`} id="container">
      <div className="myAuth-form-container myAuth-sign-up">
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSignUpSubmit();
          }}>
            <h2>Create Account</h2>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fab fa-github"></i></a>
              <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <input type="text" name="username" placeholder="UserName" value={signUpData.username} onChange={handleInputChange} />
            {/* <input type="text" name="first_name" placeholder="first name" value={signUpData.first_name} onChange={handleInputChange} />
            <input type="text" name="last_name" placeholder="last name" value={signUpData.last_name} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" value={signUpData.email} onChange={handleInputChange} /> */}
            <input type="password" name="password" placeholder="Password" value={signUpData.password} onChange={handleInputChange} />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="myAuth-form-container myAuth-sign-in">
          <form>
            <h2>Sign In</h2>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fab fa-github"></i></a>
              <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <input type="text" placeholder="UserName" value={username} onChange={handleUsernameChange} />
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            <a href="#">Forget Your Password?</a>
            <button type="button" onClick={handleClickLogin}>Sign In</button>
          </form>
        </div>
        <div className="myAuth-toggle-container">
          <div className="myAuth-toggle">
            <div className="toggle-panel myAuth-toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details <br/>and start journey with us</p>
              <button className="hidden" id="login" onClick={handleSignInClick}>Sign In</button>
            </div>
            <div className="toggle-panel myAuth-toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal<br/> details and start journey with us</p>
              <button className="hidden" id="register" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
