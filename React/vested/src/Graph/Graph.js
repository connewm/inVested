// src/components/Content.js
//npm install react-plotly.js plotly.js
import React from 'react';
import './Graph.css';
//import Plot from 'react-plotly.js';

const Graph = (props) => {
  // incoming props to determine the graph to fetch
  return (
  		//<Plot
        //data={[
         // {
         //   x: [1, 2, 3],
         //   y: [2, 6, 3],
         //   type: 'scatter',
         //   mode: 'lines+markers',
         //   marker: {color: 'red'},
         // },
         // {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        //]}
        //layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      ///>
      // TODO: replace static image with lamdba call to generate graph
      <img src="https://stocksnips.net/wp-content/uploads/2018/05/stock-news-sentiment-vs-stock-price-2.png" className="fin-graph" alt="graph" />
    );
};

export default Graph;
