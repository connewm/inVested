import React, { Component } from 'react';
import './FeaturesComponent.css';
import 'simple-line-icons/css/simple-line-icons.css';
import { Grid } from '@material-ui/core';

export const FeaturesComponent = (props)=>{
  return <section className="features" id="features">
    <div className="container">
      <div className="section-heading text-center">
        <h2 className = "features-h2">Features</h2>
        <hr />
      </div>

  <div className = "FeaturesGrid">    
      <Grid container  direction="row" justify="space-around" alignItems="center">
          <Grid item className = "feature-item">
            <i className="icon-emotsmile text-primary"></i>
            <h3>Sentement Analysis</h3>
            <p className="text-muted">Know what people are saying and feeling about Any stock!</p>
          </Grid>
          <Grid item classname = "feature-item">
            <i className="icon-people text-primary"></i>
            <h3>Chatbot</h3>
            <p className="text-muted">Don't know what to do? Need help figuring you next move? Talk to the VestEd Assistant!</p>
          </Grid>
    </Grid>
    <Grid container direction="row" justify="space-around" alignItems="center">
        <Grid item classname = "feature-item">
            <i className="icon-graph text-primary"></i>
            <h3>Correlation statistics </h3>
            <p className="text-muted">ai/statistics based metric for judging correlation between public sentement and stock prices</p>
          </Grid>
          <Grid item classname = "feature-item">
              <i className="icon-present text-primary"></i>
              <h3>Free to Use</h3>
              <p className="text-muted">You do not need any sort of subscription to use this!</p>
          </Grid>
    </Grid>
              
        
  </div>            
                 
                
        
        
    </div>
  </section>
};