  
import React, { Component } from 'react';
import './FooterComponent.css';
import { Grid } from '@material-ui/core';

export const FooterComponent = (props)=>{
  return <footer>

    <div className="Footer-container">

      <Grid container  direction="column" justify="space-between" alignItems="center">
            <Grid item>
              <p>&copy; 2020 Vested. All Rights Reserved.</p>
            </Grid>
            <Grid item>
              <a href="#">Privacy</a>
            </Grid>
            <Grid item>
              <a href="#">Terms</a>
            </Grid>
            <Grid item>
              <a href="#">FAQ</a>
            </Grid>
        </Grid>
      
    </div>
  </footer>
};
