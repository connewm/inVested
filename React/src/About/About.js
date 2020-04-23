// import components
import React from 'react';
import Header from '../Header/Header';
import NewsFeed from '../NewsFeed/newsfeed';

// import styles
import './About.css';

function About() {
  return (
    <div className="About">
    <h1>About the Team</h1>
      <p className="content">Our mission here at VestEd is to provide free, quality tools for investors with different levels of expertise.  We want to make it easier not only to get into the stock market, but to learn effective trading strategies.  With the help of our data-driven tools, resources, and some effort, anyone can learn to grow their capital with confidence.  You may talk to one of our personal assistants with the blue chat bubble.  So, have a look around the site, learn some skills, and get invested in VestEd.</p>
    </div>
  );
}

export default About;