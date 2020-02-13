// import components
import React from 'react';
import Content from '../Content/Content';
import Header from '../Header/Header';



// import styles
import './App.css';

function App() {
  return (
    <div className="App">
      <Header value="site-header"/>
      <div className="main">
        <Content value="mainPage"/>
      </div>
    </div>
  );
}
/*
      <header className="App-header">
        <img src="https://www.100daysofrealfood.com/wp-content/uploads/2011/06/popcorn1-500x500.jpg" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
*/

export default App;