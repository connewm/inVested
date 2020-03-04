// import components
import React from 'react';
import Content from '../Content/Content';
import Header from '../Header/Header';
import NewsFeed from '../NewsFeed/newsfeed';

// import styles
import './App.css';


function App() {

  

  return (
    <div className="App">
      <Header value="site-header"/>
      <div className="main">
        <Content value="mainPage"/>
        <div className="news-wrapper">
          <NewsFeed value = "newsfeed"/>
        </div>
      </div>
    </div>
  );
}


export default App;