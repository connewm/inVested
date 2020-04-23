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
          article_list: result.data.dates[result.data.dates.length - 2].metadata
        })
        // DEBUG: Log the received data
        // console.log(result);
        // console.log(result.data.dates[0].metadata);
      })
    }

    render() {
      // incoming props to determine the graph to fetch
      if(this.state.article_list && this.state.article_list.length && this.state.article_list.length > 0){
        return (
        <div className="NewsFeed">
        {
          <NewsItem articles = {this.state.article_list}/>
        }
        </div>
        );
      } else {
        return(
          <div className="NewsFeed">
            <p>Rendering...</p>
          </div>
        );
      }
  }
    
}

export default NewsFeed;
