import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ReactDOM from 'react-dom';
import AppChooser from "./AppChooser"

class App extends React.Component{
  constructor (props)
  {
    super(props);
    // this.render();
  }
  render()
  {
    ReactDOM.render(<AppChooser />, document.getElementById('root'));  
    return(
        <div className = "container">
        </div>
        );
    }
  
}

export default App;