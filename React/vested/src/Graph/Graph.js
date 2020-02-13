// src/components/Content.js
import React from 'react';
import './Graph.css';

const Graph = (props) => {
  // incoming props to determine the graph to fetch
  return (
      // TODO: replace static image with lamdba call to generate graph
      <img src="https://stocksnips.net/wp-content/uploads/2018/05/stock-news-sentiment-vs-stock-price-2.png" className="fin-graph" alt="graph" />
    );
};

export default Graph;