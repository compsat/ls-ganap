import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../assets/ls-ganap-logo.svg';
import '../Nav.css'

class MainNav extends Component {
  render() {
    return (
      <nav>
        <div className='mobile-nav'>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <div className='logo'>Logo</div>
              {/* <img className='logo' src={logo} alt='LS Ganap Logo'/> */}
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
        </div>
        <div className='desktop-nav'>
          <ul>
            <li>
              <div className='logo'>Logo</div>
              {/* <img className='logo' src={logo} alt='LS Ganap Logo'/> */}
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default MainNav;
