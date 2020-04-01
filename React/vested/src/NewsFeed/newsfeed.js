import React from 'react';
import './newsfeed.css';
import NewsItem from './newsitem';

function NewsFeed(props) {
  return (
      <div className="NewsFeed">
        <NewsItem articles = {props.article_list}/>
      </div>
  );
}

export default NewsFeed;
