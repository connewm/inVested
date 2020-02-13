// src/components/Content.js
import React from 'react';
import './Icon.css';

const Header = (props) => {
  // incoming props to determine the graph to fetch
  return (
      <div className="icon">
          <img src='https://www.alvincollege.edu/images/white_hamburger_4.png' className='menu' alt='icon'></img>
      </div>
    );
};

export default Header;