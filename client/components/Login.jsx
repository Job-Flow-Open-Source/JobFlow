import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  useEffect(()=> {
    props.showNav(false)
  },[])
  
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formsBody = Object.fromEntries(data.entries())
    const {username, password} = formsBody;

    console.log('username', username)
    axios.post('http://localhost:3000/user/signin/', {
      username,
      password,
      })
      .then(res => {
        console.log('userInfo:', res.data)
        props.setUserInfo(res.data)
        navigate('/applicationview')
      })
      .catch( err => console.log(err))
    }


  return (
    <div className="loginPage">
      <div className="loginBox">
        <form className="loginForm" onSubmit={ (event) => { handleLogin(event);}}>
          <input className="formInfo" id="username" name="username" type="text" placeholder="Username"></input>
          <input className="formInfo" id="password" name="password" type="password" placeholder="Password"></input>
          <input className="loginBtn" type="submit" value="Login"></input>
        </form>
        <a href="/signup">Sign Up</a>
      </div>
    </div>
  )
}

export default Login;