// src/components/Content.js
import React from 'react';
import CandleStickGraph from './CandleStickGraph';
import { timeParse } from "d3-time-format";
import './Graph.css';

// Import material UI
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
        graphType: "One Day",
        chosenGraph: "One Day",
        selectedCompany: "Google",
        oneDayData: {},
        company: "",

        stockData: [],

        avgSentiment: 0,
        regSlope: 0,
        regOffset: 0,
        data: {}
      };
  }

  // TODO: Implement setCompanyWeekData and setCompanyHistoricalData

  // helper function setCompanyDayData sets the state based onthe provided comany
  setCompanyDayData(company) {
    // TODO: implement condition to eliminate redundant API calls
    if(this.state.company != company || this.state.graphType != "One Day"){
      this.setState({graphType: "One Day"});
      // fetch data and, once retrieved, resolve the promise and update the state.
      get_company_data(company).then(result => {
        let yesterday = result.data.dates[result.data.dates.length - 2];
        this.setState({
          // get raw data in JSON format, according to standardized format set by group
          data: result.data,
          // extract company name
          company: result.data.company_name,

          oneDayData: yesterday,

          // extract sentiment values
          sentiment: yesterday.pos_neg.map((sentimentScore) => sentimentScore.score),

          // Assign values for all stock variables
          stockData: yesterday.stock_data.map((data) => {
            return(
              {
                // Get time values for each data point
                date: parseDate(data.minute),
                // Get open, high, low, and close values for stock data
                open: parseFloat(data.open_value),
                high: parseFloat(data.high_pt),
                low: parseFloat(data.low_pt),
                close: parseFloat(data.close_value),
              }
            );
          }),

          // Calculate the average sentiment value(s)
          avgSentiment: yesterday.pos_neg.map((sentimentScore) => parseFloat(sentimentScore.score)).reduce(sum, 0) / yesterday.pos_neg.length
        })
        // DEBUG: Log the received data
        // console.log(result);
        // console.log(result.data.dates[0].pos_neg.map((sentimentScore) => sentimentScore.score).reduce(sum, 0));
        // console.log(result.data.dates[0].pos_neg.length);
      })
    }
  }

  // Use lifecycle hook componentDidMount to update state, results are reflected on webpage
  componentDidMount() {
    // set the data on the page to a default for Google
    this.setCompanyDayData("Google");
  }

  // selectCompany wraps setCompanyDayData in an arrow function, extracting a value from the event
  selectCompany = (event) => {
    this.setState({selectedCompany: event.target.value});
    this.setCompanyDayData(event.target.value);
  };

  // selectGraph sets the graphType to event's given value
  selectGraph = (event) => {
    this.setState({graphType: event.target.value});
    // TODO: set graph data based on change in graphType
  };

  // give user advice based on the stock price and sentiment
  get adviseOnStock() {
    let recommendation = "";
    
    let isStockRising = true;
    // check if the sentiment is positive or negative, true = positive, false = negative
    let isSentimentPos = this.state.avgSentiment > 0;
    
    // check if the stock is rising or falling, a true value means the stock is rising, and false falling
    if(this.state.oneDayData.hasOwnProperty('stock_data')){
      isStockRising = (this.state.stockData[this.state.stockData.length - 1].close - this.state.stockData[0].open) > 0;
    }
    
    if(isStockRising){
      if(isSentimentPos){
        // positive stock trend and positive sentiment
        recommendation = "buying or holding";
      } else {
        // positive stock trend and negative sentiment
        recommendation = "selling";
      }
    } else {
      if(isSentimentPos){
        // negative stock trend and positive sentiment
        recommendation = "buying";
      } else {
        // negative stock trend and negative sentiment
        recommendation = "quickly selling";
      }
    }
    return recommendation;
  }

  // incoming props to determine the graph to fetch
  render() {
    let isSentimentPos = this.state.avgSentiment > 0;
    let rise_fall = 0;
    if(this.state.oneDayData.hasOwnProperty('stock_data')){
      rise_fall = this.state.stockData[this.state.stockData.length - 1].close - this.state.stockData[0].open;
      console.log("Computed rise/fall: "+rise_fall);
      console.log((this.state.stockData[0].open));
      console.log((this.state.stockData[this.state.stockData.length - 1].open));
    } else {
      console.log("Did not compute rise/fall.");
    }
    
    return (
      <div className="graph-component">
        <div className="graph-content">
          <div className="selectors">
            <FormControl className="form-control">
              <InputLabel shrink>
                Company
              </InputLabel>
              <Select
                value={this.state.selectedCompany}
                onChange={this.selectCompany}
                className="select-empty"
                inputProps={{ 'aria-label': 'Selected Company' }}>
                {/* List all available companies, additional companies can be added by following the provided format */}
                <MenuItem value="Google">Google</MenuItem>
                <MenuItem value="Amazon">Amazon</MenuItem>
              </Select>
            </FormControl>

            <FormControl className="form-control">
              <InputLabel shrink>
                Time Period
              </InputLabel>
              <Select
                value={this.state.chosenGraph}
                onChange={this.selectGraph}
                className="select-empty"
                inputProps={{ 'aria-label': 'Selected Company' }}>
                {/* List all available graping ranges */}
                <MenuItem value="One Day">One Day</MenuItem>
                <MenuItem value="One Week">One Week</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="graph-wrapper">
            <div className="graph-title">
              <p>{this.state.selectedCompany} {this.state.graphType} Stock Graph - {this.state.graphType == "One Day" ? "Yesterday" : "Past Week"}</p>
            </div>
            <CandleStickGraph
              data={this.state.stockData}
              width={800}
              ratio={1}
            />
          </div>
        </div>
        <div className="text-wrapper">          
          <p>{this.state.company} had a {isSentimentPos ? "positive" : "negative"} public sentiment yesterday ({isSentimentPos ? "+" : "-" }{this.state.avgSentiment.toFixed(2)}). {this.state.company}'s stock {rise_fall > 0 ? "rose" : "fell"} after yesterday's trading.  So, we recommend {this.adviseOnStock} {this.state.company} stock today.</p>
        </div>
      </div>
    );
  }
};

export default Graph;
