// src/components/Content.js
import React from 'react';
import Graph from '../Graph/Graph';
import About from '../About/About';

// import styles
import './Content.css';

const Content = (props) => {
  const graphType = 'sentiment';
  if(props.value==='graph'){
    return (
      <div className="content">
        <h1>Financials Graph</h1>
        <div className="data-insights">
          <Graph value={graphType}/>
        </div>
        <div className="text-wrapper">          
          <p>Based on the graphed data above, we recommend holding stock until public sentiment changes from negative to positive.</p>
        </div>
        
      </div>
    );
  } else if (props.value==='about'){
    return (
      <div className="content">
        <About value="about"/>
      </div>
    );
  } else {
    // TODO: Replace error message with default content for rendering
    return (
      <div>
        <h1>ERROR LOADING CONTENT FROM PROPS</h1>
      </div>
    );
  }
};

export default Content;