
import React, { Component } from 'react';
import './TeamComponent.css';
import { Grid } from '@material-ui/core';
import {Button} from '@material-ui/core';
import swetha from './img/swetha.png';
import connor from './img/connor.png';
import leslie from './img/leslie.png';
import jacob from './img/jacob.png';
import riley from './img/riley.png';
import joe from './img/joe.png';
import shreya from './img/shreya.png';





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
                <Button variant="contained" color = "primary" href="https://www.linkedin.com/in/swetha-chandrasekar-88800b127">
                    <i className="icon-social-linkedin text-primary" ></i>
                </Button>
            </Grid>
            <Grid item>
                <img class="avatar" src={leslie} alt=""/>
                <h4 classname = "names"> Leslie Zhou </h4>
                <Button variant="contained" color = "primary" href="https://www.linkedin.com/in/lesliezhou">
                    <i className="icon-social-linkedin text-primary" ></i>
                </Button>
            </Grid>
            <Grid item>
                <img class="avatar" src={connor} alt=""/>
                <h4 classname = "names"> Connor Newman </h4>
                <Button variant="contained" color = "primary" href="https://www.linkedin.com/in/connor-newman-b857bb17b">
                    <i className="icon-social-linkedin text-primary" ></i>
                </Button>
            </Grid>

        </Grid>
        <Grid container  direction="row" justify="space-between" alignItems="center">
            <Grid item>
                <img class="avatar" src={jacob} alt=""/>
                <h4 classname = "names"> Jacob Marshall </h4>
                <Button variant="contained" color = "primary" href="https://www.linkedin.com/in/jacob-marshall-074871b7">
                    <i className="icon-social-linkedin text-primary" ></i>
                </Button>
            </Grid>
            <Grid item>
                <img class="avatar" src={riley} alt=""/>
                <h4 classname = "names" > Riley Shaw </h4>
                <Button variant="contained"  color = "primary" href="https://www.linkedin.com/in/swetha-chandrasekar-88800b127">
                    <i className="icon-social-linkedin text-primary" ></i>
                </Button>
            </Grid>
            <Grid item>
                <img class="avatar" src={joe} alt=""/>
                <h4 classname = "names" > Joe Rice </h4> 
                <Button variant="contained" color = "primary" href="">
                    <i className="icon-social-linkedin text-primary" ></i>
                </Button> 
            </Grid>
            <Grid item>
                <img class="avatar" src={shreya} alt=""/>
                <h4 classname = "names" > Shreya Byreddy </h4>
                <Button variant="contained" color = "primary" href="https://www.linkedin.com/in/shreya-byreddy-331b72172">
                    <i className="icon-social-linkedin text-primary" ></i>
                </Button>
            </Grid>
        </Grid>

    </div>
    </div>
  </section>
};