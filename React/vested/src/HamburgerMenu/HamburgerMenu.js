import React from 'react';
import './HamburgerMenu.css';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ClearIcon from '@material-ui/icons/Clear';

import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function HamburgerMenu(){
    const classes = useStyles();
    const [state, setState] = React.useState({
      'left': false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState({ ...state, [anchor]: open });
    }

    const list = (classes, anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}>
        <List>
          {['Home', 'About', 'Graphs'].map((text, index) => (
            <Link className='link' to={text=== 'Home' ? '/' : (text === 'About' ? '/about' : '/graph')}>
              <ListItem button key={text}>
                <ListItemIcon>{text === 'Home' ? <HomeIcon/> : (text === 'About' ? <PeopleIcon/> : <TrendingUpIcon/>)}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {['Exit'].map((text) => (
            <ListItem button key={text}>
              <ListItemIcon>{text === 'Exit' ? <ExitToAppIcon/> : <ClearIcon/>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return(
      <div className="hamburger-menu">
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            <MenuIcon style={{ fontSize: 40, padding:20 }} aria-controls="simple-menu" aria-haspopup="true" onClick={toggleDrawer(anchor, true)}/>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(classes, anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    )
  }
