// import components
import React from 'react';
import Content from '../Content/Content';
import Header from '../Header/Header';
import NewsFeed from '../NewsFeed/newsfeed';

// import styles
import './App.css';


function App() {
  


  /* TO GET Dynamic ARTICLES must input a list of articles */
  
  var articles = [ {
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
    <div className="App">
      <Header value="site-header"/>
      <div className="main">
        <Content value="mainPage"/>
        <div className="news-wrapper">
          {/* <NewsFeed value = "newsfeed" data = {articles}/> */}
          <NewsFeed value = "newsfeed" article_list = {articles}/>
        </div>
      </div>
    </div>
  );
}


export default App;