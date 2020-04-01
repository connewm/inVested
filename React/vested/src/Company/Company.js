import React from 'react';
import './Company.css';
import get_company_data from '../Utils/http_functions';

class Company extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            company: "",
            stock: [],
            sentiment: []
        };
    }

    // Use lifecycle hook componentDidMount to update state, results are reflected on webpage
    componentDidMount() {
        // fetch data, once it retrieves resolve the promsie and update the state.
        get_company_data("AMZN").then(result => this.setState({
            // response.data // full contents of the response
            // response.data[0] // first element of the response
            // response.data[0].name // name of the first company in the response
            company: result.data[0].name,
            stock: result.data[0].stock,
            sentiment: result.data[0].sentiment
        }))
    }

    render() {
        // incoming props to determine the graph to fetch
        return (
            <div className="content">
                <p>{this.state.company} stock value:</p>
                {
                    this.state.stock.map((price) =>  <p> ${price} </p>)
                }
            </div>
        );
    }
}

export default Company;