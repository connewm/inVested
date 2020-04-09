import React from 'react';
import './Company.css';
import get_company_data from '../Utils/get_company_data';

class Company extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            company: "",
            stock: [],
            sentiment: [],
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
          sentiment: result.data.dates.Apr0120.pos_neg,
          company: result.data.company_name
        })
        // DEBUG: Log the received data
        // console.log(result);
        // console.log(result.data.dates.Apr0120.pos_neg);
      })
    }

    render() {
        // incoming props to determine the graph to fetch
        return (
            <div className="content">
                <p>{this.state.company}:</p>
                <p>Positive/negative sentiment values:</p>
                {
                    this.state.sentiment.map((data) =>  <p> {data > 0 ? '+' : ''}{data} </p>)
                }
            </div>
        );
    }
}

export default Company;