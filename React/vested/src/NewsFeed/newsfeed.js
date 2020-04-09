import React from 'react';
import './newsfeed.css';
import NewsItem from './newsitem';
import get_company_data from '../Utils/get_company_data';



// function NewsFeed(props) {
//   return (
//       <div className="NewsFeed">
//         <NewsItem articles = {props.article_list}/>
//       </div>
//   );
// }


class NewsFeed extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          data: {},
          article_list: []
        }

    }

     // Use lifecycle hook componentDidMount to update state, results are reflected on webpage
     componentDidMount() {
      // fetch data and, once retrieved, resolve the promise and update the state.
      get_company_data("Google").then(result => {
        this.setState({
          // data in JSON format according to standards set by group
          data: result.data,
          article_list: result.data.dates.Apr0120.metadata
        })
        // DEBUG: Log the received data
        // console.log(result);
        // console.log(result.data.dates.Apr0120.pos_neg);
      })
    }

    render() {
      // incoming props to determine the graph to fetch
      return (
      <div className="NewsFeed">
        <NewsItem articles = {this.state.article_list}/>
      </div>
      );
  }
    
}

export default NewsFeed;
