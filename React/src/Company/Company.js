import React from 'react';
import './Company.css';
import get_company_data from '../Utils/get_company_data';

const sum = (accumulator, curData) => {
  return accumulator + parseFloat(curData);
};

class Company extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            company: "",
            stock: [],
            sentiment: [],
            avgSentiment: 0,
            data: {}
        };
    }

    // Use lifecycle hook componentDidMount to update state, results are reflected on webpage
    componentDidMount() {
      // fetch data and, once retrieved, resolve the promise and update the state.
      get_company_data("Google").then(result => {
        this.setState({
          // data in JSON format according to standards set by group
          data: result.data,
          sentiment: result.data.dates[0].pos_neg.map((sentimentScore) => sentimentScore.score),
          company: result.data.company_name,
          avgSentiment: result.data.dates[0].pos_neg.map((sentimentScore) => sentimentScore.score).reduce(sum, 0) / result.data.dates[0].pos_neg.length
        })
        // DEBUG: Log the received data
        // console.log(result);
        // console.log(result.data.dates[0].pos_neg.map((sentimentScore) => sentimentScore.score).reduce(sum, 0));
        // console.log(result.data.dates[0].pos_neg.length);
      })
    }

    render() {
        // incoming props to determine the graph to fetch
        return (
            <div className="content">
                <p>{this.state.company}:</p>
                <p>Average sentiment for today: {this.state.avgSentiment}</p>
                <p>Raw sentiment values:</p>
                {
                    this.state.sentiment.map((data) =>  <p> {data > 0 ? '+' : ''}{data} </p>)
                }
            </div>
        );
    }
}

export default Company;