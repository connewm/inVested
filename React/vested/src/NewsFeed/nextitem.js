
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import './newsitem'




const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


function NextItem(props){
  const classes = useStyles();

    return(

        
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
          {/* <Avatar alt={props.source} src="nyt.png"/>       TODO:: change avatar to actual logos */}
    <Avatar >{props.avatar}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={props.title}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {props.source}   {/* just adds a header to the lower text in the news item */}
              </Typography>
          { "— " }{props.text}
            </React.Fragment>
          }
        />
      </ListItem>


    );


}

export default NextItem