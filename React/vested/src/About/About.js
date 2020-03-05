// import components
import React from 'react';
import Header from '../Header/Header';
import NewsFeed from '../NewsFeed/newsfeed';

// import styles
import './About.css';

const data = {
  content: {
    body: [
      {
        avatar: "NYT" ,
        source: "NY TIMES",
        title:  "New iPhones Fuel Strong Profit for Apple",
        text: "Apple found renewed growth with an increase in phone sales ", 
        link: "https://www.nytimes.com/2020/01/28/technology/apple-iphone-sales-earnings.html"

      },
      {
        avatar: "BLB",
        source: "Bloomberg", 
        title: "Apple’s Once-Sunny China Future Looks Hazy",
        text: "China was supposed to be crucial to Apple Inc.’s future  ",
        link: "https://www.bloomberg.com/opinion/articles/2020-01-29/apple-s-once-sunny-china-future-looks-hazy"
      },
      {
        avatar: "NYT", 
         source: "NY TIMES",
         title: "How the Coronavirus Could Hurt Apple and Starbucks",
         text: "More companies are temporarily halting business ",
         link: "https://www.nytimes.com/2020/01/29/business/dealbook/coronavirus-apple-starbucks.html"
      },
      {
        avatar:"ABC", 
        source: "ABC",
        title: "Apple temporarily closes stores in China amid virus outbreak",
        text: "Apple is temporarily closing its 42 stores in mainland China, one of its largest markets ", 
        link: "https://abcnews.go.com/Business/wireStory/apple-temporarily-closes-stores-china-amid-virus-outbreak-68694240"
      },
      {
        avatar: "NBC",
        source: "NBC",
        title: "Apple event: TV, news and video game services signal new direction for iPhone maker",
        text: "The tech giant unveiled a new streaming video offering on Monday as part ",
        link: "https://www.nbcnews.com/tech/apple/apple-event-credit-card-news-subscription-service-signal-new-direction-n986996"

      },
      {
        avatar:"NBC",
        source: "NBC", 
        title: "Apple will make the new Mac Pro in Austin, avoiding some China tariffs",
        text: "Apple will manufacture the next generation of its Mac Pro desktop computer in Austin, Texas, ",
        link: "https://www.cnbc.com/2019/09/23/apple-will-make-the-mac-pro-in-austin-avoiding-some-china-tariffs.html"

      },
    ]
  }
};

function About() {
  return (
    <div className="About">
      <Header value="site-header"/>
      <div className="main">
        <p className="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <div className="news-wrapper">
          <NewsFeed value = "newsfeed"/>
        </div>
      </div>
    </div>
  );
}

export default About;