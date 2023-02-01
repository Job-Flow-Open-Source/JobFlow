import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
// import Home from './components/Home';
import ApplicationView from './components/ApplicationView';

const App = (props) => {
  const [showNav, setShowNav] = useState(false);
  const [userInfo, setUserInfo] = useState({});
 


  return (
    <div className="router">
      {/* content seen on every page */}
      <div>
        {showNav && <Navbar/>}
      </div>
      <div className="routerMain" id='content'>
        <Routes>
          {/* different path inside each rout, component inside- loggin, sign up, home */}
          
          <Route path='/' element={<Login showNav={setShowNav} setUserInfo={setUserInfo}/>} />
          <Route path='/signup' element={<Signup showNav={setShowNav}/>} />
          <Route path='/applicationview' element={<ApplicationView 
            showNav={setShowNav}
            userInfo={userInfo}
          />} />
          {/* <Route path='/home' element={<Home />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;