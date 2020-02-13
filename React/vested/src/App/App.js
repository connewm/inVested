// import components
import React from 'react';
import Content from '../Content/Content';
import Header from '../Header/Header';

// import styles
import './App.css';

const App = () => {
  const [items, setItems] = useState([
    "oranges", "apples", "candy"
  ]);
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

const ListItem = (props) => (
  <li onClick={()=> props.handleClick(props.name)}>{props.name}</li>
)

const ListDisplay = (props) => {
  const items = props.items.map((item, i) => (
    <ListItem
      key={i}
      name={item}
      handleClick={props.handleClick}
    />
  ))
  return (
    <ul>
      {items}
    </ul>
  )
}

const InputText = (props) => {
  const [value, setValue] = useState('')
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      props.handleSubmit(value);
      setValue('');
    }}>
      <input type="text" value={value} onChange={e => setValue(e.target.value)}/>
    </form>
  )
}

export default App;