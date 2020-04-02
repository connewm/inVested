// src/components/Content.js
import React from 'react';
// import Icon from '../Icon/Icon'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = (props) => {
  // incoming props to determine the graph to fetch
  return (
      <div className="site-header">
        <HamburgerMenu/>

        <Link className="title" to="/graph">
          <h2 id="site-title">VestEd</h2>
        </Link>

        <div className="spacer"/>

        {/*Notifications*/}
        <Link to="/">
          <div className="icon" >
            <AnnouncementOutlinedIcon style={{ fontSize: 40, padding:20  }}/>
          </div>
        </Link>

        {/*Settings Menu*/}
        <div className="icon" >
          <SettingsOutlinedIcon style={{ fontSize: 40, padding:20 }}/>
        </div>
 
      </div>
    );
};

export default Header;