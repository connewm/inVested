// src/components/Content.js
import React from 'react';
// import Icon from '../Icon/Icon'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import MenuIcon from '@material-ui/icons/Menu';

import './Header.css';

const Header = (props) => {
  // incoming props to determine the graph to fetch
  return (
      <div className="site-header">
        <MenuIcon style={{ fontSize: 40, padding:20 }}/>
        <h2 id="site-title">VestEd</h2>
        <div className="spacer"></div>

        <AnnouncementOutlinedIcon style={{ fontSize: 40, padding:20  }}/>     
        <SettingsOutlinedIcon style={{ fontSize: 40, padding:20 }}/>

 
      </div>
    );
};

export default Header;