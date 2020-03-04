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

  return (
   <div> 
  

    <List className={classes.root}>

        {props.articles.map(function(article,index){
         
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

