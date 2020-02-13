import React from 'react';
import './newsfeed.css';
import NewsItem from './newsitem';



function NewsFeed(props) {

   
    return (
        <div className="NewsFeed">
          <NewsItem title ={ "New iPhones Fuel Strong Profit for Apple"} text = {"Apple found renewed growth with an increase in phone sales as well as younger products ... "} />
          {/* <NewsItem title ={ "Apple’s Once-Sunny China Future Looks Hazy"} text = {"China was supposed to be crucial to Apple Inc.’s future. A tech-savvy audience ... "} />
          <NewsItem title ={ "How the Coronavirus Could Hurt Apple and Starbucks"} text = {"More companies are temporarily halting business in parts of China ... "} /> */}
        </div>
    )

  }

export default NewsFeed;
