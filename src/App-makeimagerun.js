import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { My_Class } from './MyClass';

const myclass = [
  '/photo/IMG_0509.jpg',
  '/photo/IMG_0589.jpg',
  '/photo/IMG_0657.jpg',
  '/photo/IMG_0680.jpg'
];

class App_makeimagerun extends Component {
  constructor(props) {
    super(props);

    this.state = { currentGP: 0 };

    this.interval = null;

    this.nextGP = this.nextGP.bind(this);
  }

  nextGP() {
    let current = this.state.currentGP;
    let next = ++current % myclass.length;
    this.setState({ currentGP: next });
  }

  componentDidMount() {
    this.interval = setInterval(this.nextGP, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let src = myclass[this.state.currentGP];
    return (
      <div>
        <h1>My class</h1>
        <img src={src}  width="1000" height="400" align="center" valign="center"/>
      </div>
    );
}

}


  


export default App_makeimagerun;