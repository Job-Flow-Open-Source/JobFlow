import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { ReactComponent as Logo } from '../resources/qeraunos-logo.svg';

function Navbar(props) {
  const { enterSite } = props;
  return (
    <nav className='nav'>
      {/* <div className='nav-logo'>
        <Link to='/' onClick={() => enterSite()}>
          <Logo className='logo' />
        </Link>
      </div> */}
      <div>
        <span className='navPaths'>
            <NavLink
              to='/applicationView'
              value='ApplicationView'
              style={({ active }) => (active ? active : undefined)}
            >
              Applications
            </NavLink>
          </span>
          <span className='navPaths'>
            <NavLink
              to='/Resume'
              value='Resumes'
              style={({ active }) => (active ? active : undefined)}
            >
              Resumes
            </NavLink>
          </span>
          <span className='navPaths'>
            <NavLink
              to='/'
              value='Login'
              style={({ active }) => (active ? active : undefined)}
            >
              Logout
            </NavLink>
          </span>
      </div>
    </nav>
  );
}

export default Navbar;
