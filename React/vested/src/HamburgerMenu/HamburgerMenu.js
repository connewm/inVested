import React from 'react';
import './HamburgerMenu.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

class HamburgerMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {anchorEl: null, open: false};
        const style = {};
    }

    handleClick = (event) => {
      this.setState({anchorEl: event.currentTarget, open: true});
    }

    handleClose = () => {
      this.setState({anchorEl: null, open: false});
    }

    useStyles = {
      top: '2vh',
      left: '1vw'
    };

    expandedMenu() {

    }

    render() {
      return(
        <div className="hamburger-menu">
          {/*<Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
            Open Menu
          </Button>*/}
          <MenuIcon style={{ fontSize: 40, padding:20 }} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}/>
          <Menu
            id="site-menu"
            anchorEl={this.anchorEl}
            getContentAnchorEl={null}
            keepMounted
            open={this.state.open}
            onClose={this.handleClose}
            style={this.useStyles}>
            
            <Link to="/" className="menu-link">
              <MenuItem onClick={this.handleClose}>Home</MenuItem>
            </Link>
            
            <Link to="/about" className="menu-link">
              <MenuItem onClick={this.handleClose}>About</MenuItem>
            </Link>
            
            <Link to="/graph" className="menu-link">
              <MenuItem onClick={this.handleClose}>Graphs</MenuItem>
            </Link>
            
          </Menu>
        </div>
      )
    }

}

export default HamburgerMenu;