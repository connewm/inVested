// src/components/Content.js
import React from 'react';
import Icon from '../Icon/Icon'

import './Header.css';

const Header = (props) => {
  // incoming props to determine the graph to fetch
  return (
      <div className="site-header">
        <Icon value="hamburger"/>
        <h2 id="site-title">VestEd</h2>
        <div className="spacer"></div>
        <Icon value="hamburger"/>
        <Icon value="hamburger"/>
      </div>
    );
};

export default Header;