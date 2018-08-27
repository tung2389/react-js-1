import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {rand} from './random';
const red='#FF0000';
const green = '#39D1B4';
const black='#000000';
const yellow = '#FFD712';
var coltime=black;
const startstyle = {
  backgroundColor:red,
  fontSize:30
}
class App_catchthebutton extends Component{
  constructor(props)
  {
    super(props);
    this.state = {pos1:rand(0,100)+'%',pos2:rand(0,100)+'%',start:false,time:20};
    this.changepos=this.changepos.bind(this);
    this.win=this.win.bind(this);
    this.startgame=this.startgame.bind(this);
    this.countdown=this.countdown.bind(this);
  }
  changepos()
  {
    if(this.state.start)
    {
    var new1=rand(0,100)+'%';
    var new2=rand(0,100)+'%';
    this.setState({pos1:new1,pos2:new2});
    }
  }
  componentDidUpdate(prevProps,prevState)
  {
    if(this.state.time===0)
    {
    alert("you lose");
    this.setState({start:false,time:20});
    coltime=black;
    }
    else if(this.state.time<6)
    {
      coltime=red;
    }
  }
  countdown()
  {
   if(this.state.start)
   this.setState({time:this.state.time-1});
  }
  componentDidMount()
  {
    setInterval(this.changepos,600);
    setInterval(this.countdown,1000);
  }
  win()
  {
    if(this.state.start)
    {
    alert(" you win");
    this.setState({start:false,time:20});
    coltime=black;
    }
  }
  startgame()
  {
    this.setState({start:true});
  }
  render()
  {
    let visibility = this.state.start ? 'visible' : 'hidden';
    let bstyle = {
      position: 'absolute',
      backgroundColor:yellow,
      left: this.state.pos1,
      top: this.state.pos2,
      fontSize: 40,
      cursor: 'pointer',
      visibility: visibility
    };
    let timestyle = {
      color:coltime
    }
    return(
      <div>
        <h1 align='center'><button style={startstyle} onClick={this.startgame}> Start </button></h1>
        <h1 align='center' style={timestyle}> Remaining Time : {this.state.time} </h1>
        <button style={bstyle} onClick={this.win}> Catch me if you can </button>
      </div>
    );
  }
}
export default App_catchthebutton;
