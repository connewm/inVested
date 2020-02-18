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
    width: '100%',
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

      <NextItem avatar = {"NYT"} source = {"NY TIMES"} title ={ "New iPhones Fuel Strong Profit for Apple"} text = {"Apple found renewed growth with an increase in phone sales "} link = {"https://www.nytimes.com/2020/01/28/technology/apple-iphone-sales-earnings.html"} />
      <Divider variant="inset" component="li" />
      <NextItem avatar = {"BLB"} source = {"Bloomberg"} title ={ "Apple’s Once-Sunny China Future Looks Hazy"} text = {"China was supposed to be crucial to Apple Inc.’s future  "} link = {"https://www.bloomberg.com/opinion/articles/2020-01-29/apple-s-once-sunny-china-future-looks-hazy"} />
      <Divider variant="inset" component="li" />
      <NextItem avatar = {"NYT"} source = {"NY TIMES"} title ={ "How the Coronavirus Could Hurt Apple and Starbucks"} text = {"More companies are temporarily halting business "} link ={"https://www.nytimes.com/2020/01/29/business/dealbook/coronavirus-apple-starbucks.html"} />
      <Divider variant="inset" component="li" />
      <NextItem avatar = {"ABC"} source = {"ABC"} title ={ "Apple temporarily closes stores in China amid virus outbreak"} text = {"Apple is temporarily closing its 42 stores in mainland China, one of its largest markets "} link ={"https://abcnews.go.com/Business/wireStory/apple-temporarily-closes-stores-china-amid-virus-outbreak-68694240"}/>
      <Divider variant="inset" component="li" />
      <NextItem avatar = {"NBC"} source = {"NBC"} title ={ "Apple event: TV, news and video game services signal new direction for iPhone maker"} text = {"The tech giant unveiled a new streaming video offering on Monday as part "} link ={"https://www.nbcnews.com/tech/apple/apple-event-credit-card-news-subscription-service-signal-new-direction-n986996"}/>
      <Divider variant="inset" component="li" />
      <NextItem avatar = {"NBC"} source = {"NBC"} title ={ "Apple will make the new Mac Pro in Austin, avoiding some China tariffs"} text = {"Apple will manufacture the next generation of its Mac Pro desktop computer in Austin, Texas, "} link ={"https://www.cnbc.com/2019/09/23/apple-will-make-the-mac-pro-in-austin-avoiding-some-china-tariffs.html"}/>

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
