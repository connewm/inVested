// src/components/Content.js
import React from 'react';
import CandleStickGraph from './CandleStickGraph';
import { timeParse } from "d3-time-format";
import './Graph.css';

import get_company_data from '../Utils/get_company_data';

// On loading, get current date
let newDate = new Date();
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

const sum = (accumulator, curData) => {
  return accumulator + curData;
};

const parseDate = timeParse("%I:%M %p");

class Graph extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        graphType: "",
        startDate: "",
        endDate: "",
        company: "",

        /*
        time: [],
        stockOpen: [],
        stockHigh: [],
        stockLow: [],
        stockClose: [],
        stockAvg: [],
        sentiment: [],
        */

        stockData: [],

        avgSentiment: 0,
        regSlope: 0,
        regOffset: 0,
        data: {}
      };
  }

  // Use lifecycle hook componentDidMount to update state, results are reflected on webpage
  componentDidMount() {
    // fetch data and, once retrieved, resolve the promise and update the state.
    get_company_data("Google").then(result => {
      this.setState({
        // get raw data in JSON format, according to standardized format set by group
        data: result.data,
        // extract company name
        company: result.data.company_name,
        // extract sentiment values
        sentiment: result.data.dates[0].pos_neg.map((sentimentScore) => sentimentScore.score),

        // Get time values for each data point
        //time: result.data.dates[0].stock_data.map((data) => data.minute),

        // Assign values for all stock variables
        //stockOpen: result.data.dates[0].stock_data.map((data) => parseFloat(data.open_value)),
        //stockHigh: result.data.dates[0].stock_data.map((data) => parseFloat(data.high_pt)),
        //stockLow: result.data.dates[0].stock_data.map((data) => parseFloat(data.low_pt)),
        //stockClose: result.data.dates[0].stock_data.map((data) => parseFloat(data.close_value)),
        //stockAvg: result.data.dates[0].stock_data.map((data) => parseFloat(data.average_value)),
        stockData: result.data.dates[0].stock_data.map((data) => {
          return(
            {
              date: parseDate(data.minute),
              open: parseFloat(data.open_value),
              close: parseFloat(data.close_value),
              high: parseFloat(data.high_pt),
              low: parseFloat(data.low_pt),
            }
          );
        }),

        // Calculate the average sentiment value(s)
        avgSentiment: result.data.dates[0].pos_neg.map((sentimentScore) => parseFloat(sentimentScore.score)).reduce(sum, 0) / result.data.dates[0].pos_neg.length
      })
      // DEBUG: Log the received data
      // console.log(result);
      // console.log(result.data.dates[0].pos_neg.map((sentimentScore) => sentimentScore.score).reduce(sum, 0));
      // console.log(result.data.dates[0].pos_neg.length);
    })
  }

  // incoming props to determine the graph to fetch
  render() {
    //const graphData = {date: this.state.time, open: this.state.stockOpen, high: this.state.stockHigh, low: this.state.stockLow, close: this.state.stockClose};
    return (
      // TODO: finish implementing feature list
      /*
        Feature list:
        - Form field for which company to look at, triggers API call and fetches and sets new data
        - Form field for graph coverage in days, 1 day, 7 day, 30 day, custom range
        -- If custom range, user must pick start and end date
      */
      <div className="graph-content">
        <CandleStickGraph
          data={this.state.stockData}
          width={800}
          ratio={1}
        />
      </div>
    );
  }
};

export default Graph;
