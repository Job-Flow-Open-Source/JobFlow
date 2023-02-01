import React, { useEffect } from 'react';
import axios from 'axios';

const Signup = (props) => {
  useEffect(()=> {
    props.showNav(false)
  },[])

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formsBody = Object.fromEntries(data.entries())
    const {username, password, first_name, last_name} = formsBody;
    
    axios.post('http://localhost:3000/user/signup/', {
      username,
      password,
      first_name,
      last_name
      })
      .then(res => {
        console.log('Account created')
        console.log('res body', res)
      })
      .catch( err => console.log(error))
    }

  return (
    <div className="signupPage">
      <div className="signupBox">
        {/* <form className="signupForm" method="POST" action="/signup/request"> */}
        <form className="signupForm" onSubmit={handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input className="formInfo" id="username" name="username" type="text"></input>
          <label htmlFor="password">Password: </label>
          <input className="formInfo" id="password" name="password" type="password"></input>
          <label htmlFor="first_name">First Name: </label>
          <input className="formInfo" id="first_name" name="first_name" type="text"></input>
          <label htmlFor="last_name">Last Name: </label>
          <input className="formInfo" id="last_name" name="last_name" type="text"></input>
          <input className="signupBtn" type="submit" value="Sign Up"></input>
          <a href='/'>Back</a>
        </form>
      </div>
    </div>
  )
}

export default Signup;