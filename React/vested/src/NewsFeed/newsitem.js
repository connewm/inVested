import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
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

export default function AlignItemsList(props) {
  const classes = useStyles();

  var data = [ {
    avtr: "NYT" ,
    src: "NY TIMES",
    ttl:  "New iPhones Fuel Strong Profit for Apple",
    txt: "Apple found renewed growth with an increase in phone sales ", 
    lnk: "https://www.nytimes.com/2020/01/28/technology/apple-iphone-sales-earnings.html"

  },
  {
    avtr: "BLB",
    src: "Bloomberg", 
    ttl: "Apple’s Once-Sunny China Future Looks Hazy",
    txt: "China was supposed to be crucial to Apple Inc.’s future  ",
    lnk: "https://www.bloomberg.com/opinion/articles/2020-01-29/apple-s-once-sunny-china-future-looks-hazy"
  },
  {
    avtr: "NYT", 
     src: "NY TIMES",
     ttl: "How the Coronavirus Could Hurt Apple and Starbucks",
     txt: "More companies are temporarily halting business ",
     lnk: "https://www.nytimes.com/2020/01/29/business/dealbook/coronavirus-apple-starbucks.html"
  },
  {
    avtr:"ABC", 
    src: "ABC",
    ttl: "Apple temporarily closes stores in China amid virus outbreak",
    txt: "Apple is temporarily closing its 42 stores in mainland China, one of its largest markets ", 
    lnk: "https://abcnews.go.com/Business/wireStory/apple-temporarily-closes-stores-china-amid-virus-outbreak-68694240"
  },
  {
    avtr: "NBC",
    src: "NBC",
    ttl: "Apple event: TV, news and video game services signal new direction for iPhone maker",
    txt: "The tech giant unveiled a new streaming video offering on Monday as part ",
    lnk: "https://www.nbcnews.com/tech/apple/apple-event-credit-card-news-subscription-service-signal-new-direction-n986996"

  },
  {
    avtr:"NBC",
    src: "NBC", 
    ttl: "Apple will make the new Mac Pro in Austin, avoiding some China tariffs",
    txt: "Apple will manufacture the next generation of its Mac Pro desktop computer in Austin, Texas, ",
    lnk: "https://www.cnbc.com/2019/09/23/apple-will-make-the-mac-pro-in-austin-avoiding-some-china-tariffs.html"

  },
];



  return (
   <div> 
  

    <List className={classes.root}>

        {data.map(function(article,index){
         
             return ( 
                    <li>
                      <NextItem  avatar = {article.avtr} source = {article.src} title ={article.ttl} text = {article.txt} link = {article.lnk} />
                      <Divider variant="inset" component="li" />
                    </li>
                    );
          })}
    
    </List>

    </div>
  );
}

