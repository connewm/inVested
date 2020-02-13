// import React from 'react';
// import './newsitem.css';



import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
import NextItem from './nextitem'





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

export default function AlignItemsList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      
      <NextItem avatar = {"NYT"} source = {"NY TIMES"} title ={ "New iPhones Fuel Strong Profit for Apple"} text = {"Apple found renewed growth with an increase in phone sales ... "} />
      <Divider variant="inset" component="li" />
      <NextItem avatar = {"CNN"} source = {"CNN"} title ={ "Apple’s Once-Sunny China Future Looks Hazy"} text = {"China was supposed to be crucial to Apple Inc.’s future ... "} />
      <Divider variant="inset" component="li" />
      <NextItem avatar = {"NYT"} source = {"NY TIMES"} title ={ "How the Coronavirus Could Hurt Apple and Starbucks"} text = {"More companies are temporarily halting business... "} />

    </List>
  );
}






//function NewsItem(props) {
  
  // const useStyles = makeStyles(theme => ({
  //   root: {
  //     width: '80%',
  //     maxWidth: 360,
  //     backgroundColor: theme.palette.background.paper,
  //   },
  //   inline: {
  //     display: 'inline',
  //   },
  // }));
  
  // export default function AlignItemsList() {
  //   const classes = useStyles();
  
  //   return (
  //     <List className={classes.root}>
  //       <ListItem alignItems="flex-start">
  //         <ListItemAvatar>
  //           <Avatar alt="NY TIMES" src="logos\nyt.png" />
  //         </ListItemAvatar>
  //         <ListItemText
  //           primary="New iPhones Fuel Strong Profit for Apple"
  //           secondary={
  //             <React.Fragment>
  //               <Typography
  //                 component="span"
  //                 variant="body2"
  //                 className={classes.inline}
  //                 color="textPrimary"
  //               >
  //                 NY TIMES
  //               </Typography>
  //               {" — Apple found renewed growth with..."}
  //             </React.Fragment>
  //           }
  //         />
  //       </ListItem>
  //       <Divider variant="inset" component="li" />
  //       <ListItem alignItems="flex-start">
  //         <ListItemAvatar>
  //           <Avatar alt="CNN" src="/static/images/avatar/2.jpg" />
  //         </ListItemAvatar>
  //         <ListItemText
  //           primary="Apple’s Once-Sunny China Future Looks Hazy"
  //           secondary={
  //             <React.Fragment>
  //               <Typography
  //                 component="span"
  //                 variant="body2"
  //                 className={classes.inline}
  //                 color="textPrimary"
  //               >
  //                 CNN
  //               </Typography>
  //               {" — China was supposed to be crucial…"}
  //             </React.Fragment>
  //           }
  //         />
  //       </ListItem>
  //       <Divider variant="inset" component="li" />
  //       <ListItem alignItems="flex-start">
  //         <ListItemAvatar>
  //           <Avatar alt="NY Times" src="/static/images/avatar/3.jpg" />
  //         </ListItemAvatar>
  //         <ListItemText
  //           primary="How the Coronavirus Could Hurt Apple and Starbucks"
  //           secondary={
  //             <React.Fragment>
  //               <Typography
  //                 component="span"
  //                 variant="body2"
  //                 className={classes.inline}
  //                 color="textPrimary"
  //               >
  //                 NY Times
  //               </Typography>
  //               {' — More companies are temporarily halting…'}
  //             </React.Fragment>
  //           }
  //         />
  //       </ListItem>
  //     </List>
  //   );
  // }


   
  //   return (
  //   // <div>
  //   //     <div className="NewsItem">
  //   //       <header className="Item-header">
  //   //         <h2>
  //   //           {props.title}
  //   //           <p>
  //   //           <b>{props.text}</b>
  //   //         </p>
  //   //         </h2>
           
            
  //   //       </header>
  //   //     </div>
  //   //     </div>
  //   // )

  // }


  //export default NewsItem;
