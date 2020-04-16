// import components
import React from 'react';
import { createBrowserHistory } from "history";
import Content from '../Content/Content';
import Chat from '../Chat/Chat';
import Header from '../Header/Header';
import NewsFeed from '../NewsFeed/newsfeed';
import Company from '../Company/Company';
import Home from '../Home/Home'

// react-dom import
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

// import styles
import './App.css';
import '../Chat/Chat.css';
import '../HamburgerMenu/HamburgerMenu.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Header value="site-header"/>
      <div className="main">

        <div className="chat-wrapper">
          <Chat value="chatbot"/>
        </div>

        {<Switch>
          <Route path="/about">
            <Content value="about"/>
          </Route>
          <Route path="/graph">
            <Content value="graph"/>
          </Route>
          <Route path="/comp">
            <Company value=""/>
          </Route>
          <Route path="/">
            <Home value=""/>
          </Route>
        </Switch>}

        <div className="news-wrapper">
          {/* <NewsFeed value = "newsfeed" data = {articles}/> */}
          <NewsFeed value = "newsfeed"/>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;