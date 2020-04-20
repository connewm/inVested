import React, { Component } from 'react';
import './CallToActionComponent.css';
import {Button} from '@material-ui/core';

export const CallToActionComponent = (props)=>{
  return <section className="cta">
    <div className="cta-content">
      <div className="container">
          <h2>Stop waiting.<br />Start Investing.</h2>
          <div className = "the-Button">
            <Button variant="contained" href="graph">
            Let's Get Started! 
            </Button>
          </div>
      </div>
    </div>

  </section>
};