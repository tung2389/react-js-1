import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Enthused } from './Enthused';
const white='#FFFFFF';
const black="#000000";
const green = '#39D1B4';
const red='#ff0000';
const blue='#0002ff';
const yellow='#fff800';
//const background1 = 'pink url("https://media.giphy.com/media/oyr89uTOBNVbG/giphy.gif") fixed';
let i=0;
const bstyle = {
    padding: '40px'
}
const b1style ={
    backgroundColor:green,
    padding: '30px'
}
const b2style ={
    backgroundColor:red,
    padding: '30px'
}
const b3style ={
    backgroundColor:blue,
    padding: '30px'
}
const b4style ={
    backgroundColor:yellow,
    padding: '30px'
}
const buttonstyle = {
  backgroundColor:green,
  fontSize:60
}
//const divstyle = {
  //background: background1,
  //height: '100%'
//}
class App_makeletterrun extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enthused: false,
      text: '',
      consttext:'',
      color1:white,
      color2:black,
      size:10
    };
    this.toggleEnthusiasm = this.toggleEnthusiasm.bind(this);
    this.addText = this.addText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeBlue=this.changeBlue.bind(this);
    this.changeRed=this.changeRed.bind(this);
    this.changeGreen=this.changeGreen.bind(this);
    this.changeYellow=this.changeYellow.bind(this);
    this.DecreaseSize=this.DecreaseSize.bind(this);
    this.IncreaseSize=this.IncreaseSize.bind(this);
    this.colorChange=this.colorChange.bind(this);
  }

  toggleEnthusiasm() {
    this.setState({
      enthused: !this.state.enthused
    });
    i=0;
  }

  setText(text) {
    this.setState({ text: text });
  }

  addText(newText) {
      let text = this.state.text + newText;
    this.setState({ text: text });
  }

  handleChange(e) {
    this.setText(e.target.value);
  }
  colorChange(e)
  {
      this.setState({color1:e.target.value});
      this.setState({color2:e.target.value});
  }
  changeRed()
  {
      this.setState({color1:red});
      this.setState({color2:red});
  }
  changeGreen()
  {
      this.setState({color1:green});
      this.setState({color2:green});
  }
  changeBlue()
  {
      this.setState({color1:blue});
      this.setState({color2:blue});
  }
  changeYellow()
  {
      this.setState({color1:yellow});
      this.setState({color2:yellow});
  }
  IncreaseSize()
  {
      let newSize=this.state.size+1;
      this.setState({size:newSize});
  }
  DecreaseSize()
  {
      let newSize=this.state.size-1;
      this.setState({size:newSize});
  }
  render() {
    let inputstyle= {
        backgroundColor:this.state.color1,
        fontSize:this.state.size
    }
    let styles = {
        color:this.state.color2,
        fontSize: 100
      };
    let button;
    if (this.state.enthused) {
    i=i+1;
    if(i===1)
    {
      this.setState({consttext:this.state.text});
    }
      button = (
        <Enthused toggle={this.toggleEnthusiasm} inp={this.state.consttext}  addText={this.addText}  />
      );

    } else {
      button = (
        <button onClick={this.toggleEnthusiasm} style={buttonstyle}>
          make it run !!!
        </button>
      );
    }

    return (
      <div align="center" /*style={divstyle}*/>
      <h1> You can choose color by the following button </h1>
      <input type="color" align="center" onChange={this.colorChange} style={bstyle}/>   
      <h1><button onClick={this.changeRed} style={b2style}></button></h1>
      <h1><button onClick={this.changeGreen} style={b1style}></button></h1>
      <h1><button onClick={this.changeBlue} style={b3style}></button></h1>
      <h1><button onClick={this.changeYellow} style={b4style}></button></h1>
      <button align="left" onClick={this.IncreaseSize}> Increase </button>
      <button align="left" onClick={this.DecreaseSize}> Decrease </button>
        <h1 style={styles}>run !!!</h1>
        <input type='text' onChange={this.handleChange} style={inputstyle}/>
        <h1></h1>
        {button}
        <h2 style={styles}>{this.state.text}</h2>
      </div>
    );
  }
}

export default App_makeletterrun;

