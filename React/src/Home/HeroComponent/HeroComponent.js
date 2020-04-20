import React, { Component } from 'react';
import './HeroComponent.css';
import {Button} from '@material-ui/core';

export const HeroComponent = (props)=>{
  return <header className="masthead">
    <div className="container h-100">
          <div className="header-content ">

         
            <h1 className="mb-5">VestEd is an app that uses AI to help with knowing when to invest and how to get the best return on investment </h1>
            <Button variant="contained" href="graph">
            Start now for free! 
            </Button>
         

          </div> 
    </div>
  </header>
};