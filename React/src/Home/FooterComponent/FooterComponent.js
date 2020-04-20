  
import React, { Component } from 'react';
import './FooterComponent.css';

export const FooterComponent = (props)=>{
  return <footer>
    <div className="container">
      <p>&copy; 2020 Vested. All Rights Reserved.</p>
      <ul className="list-inline">
        <li className="list-inline-item">
          <a href="#">Privacy</a>
        </li>
        <li className="list-inline-item">
          <a href="#">Terms</a>
        </li>
        <li className="list-inline-item">
          <a href="#">FAQ</a>
        </li>
      </ul>
    </div>
  </footer>
};
