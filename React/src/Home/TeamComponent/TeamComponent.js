
import React, { Component } from 'react';
import './TeamComponent.css';
import { Grid } from '@material-ui/core';
import swetha from './img/swetha.png';
import connor from './img/connor.png';
import leslie from './img/leslie.png';
import jacob from './img/jacob.png';
import riley from './img/riley.png';

export const TeamComponent = (props)=>{
   
  return <section className="contact bg-primary" id="contact">
    <div className="Team-Container">

      <h2>Meet the Team!</h2>
      {/* <ul className="list-inline list-people"> */}
      <div className= "grid">
        <Grid container  direction="row" justify="space-around" alignItems="flex-start">
            <Grid item>
            <img class="avatar" src={swetha} alt=""/>
            <h4 classname = "names"> Swetha Chandrasekar </h4>
            </Grid>
            <Grid item>
            <img class="avatar" src={leslie} alt=""/>
            <h4 classname = "names"> Leslie Zhou </h4>
            </Grid>
            <Grid item>
            <img class="avatar" src={connor} alt=""/>
            <h4 classname = "names"> Connor Newman </h4>
            </Grid>

        </Grid>
        <Grid container  direction="row" justify="space-between" alignItems="center">
            <Grid item>
                <img class="avatar" src={jacob} alt=""/>
                <h4 classname = "names"> Jacob Marshall </h4>
            </Grid>
            <Grid item>
                <img class="avatar" src={riley} alt=""/>
                <h4 classname = "names" > Riley Shaw </h4>
            </Grid>
            <Grid item>
                <img class="avatar" src={riley} alt=""/>
                <h4 classname = "names" > Joe Rice </h4>  
            </Grid>
            <Grid item>
                <img class="avatar" src={riley} alt=""/>
                <h4 classname = "names" > Shreya Byreddy </h4>
            </Grid>
        </Grid>

    </div>
    </div>
  </section>
};