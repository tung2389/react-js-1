import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var arr=[];
var arr2=[];
let basecase=97;
function nextChar(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}
for(let i=0;i<26;i++)
{
  arr[i]=basecase;
  basecase=basecase+1;
}
let basecase2='A';
for(let i=0;i<26;i++)
{
  arr2[i]=basecase2;
  basecase2=nextChar(basecase2);
}
const red='#FF0000';
const green = '#39D1B4';
const black='#000000'
const startstyle = {
  backgroundColor:red,
  fontSize:30
}
var coltime=black;
function random(min,max)
{
  let r=Math.random();
  return Math.floor(r*max+min);
}
window.addEventListener('keydown',this.check,false);
function check(e)
{
  alert(e.keyCode);
}
class App_targetcharacter extends Component {
  constructor(props)
  {
    super(props);
    this.state={char:arr[0],char2:arr2[0],wrong:0,correct:0,start:false,color:black,time:25};
    //this.handleKeyPress=this.handleKeyPress.bind(this);
    this.display=this.display.bind(this);
    this.Start=this.Start.bind(this);
    this.countdown=this.countdown.bind(this);
    this.check=this.check.bind(this);
  }
  check(event)
  {
    alert(event.keyCode);
    if(this.state.start)
    {
    if(event.keyCode===this.state.char)
    {
    let t=this.state.correct+1;
    this.setState({correct:t});
    this.setState({color:green});
    }
    else
    {
    let t=this.state.wrong+1;
    this.setState({wrong:t});
    this.setState({color:red});
    }
    }
  }
  componentDidUpdate(prevProps,prevState)
  {
    if(this.state.wrong===3)
    {
      alert("you lose");
      this.setState({char:arr[0],char2:arr2[0],wrong:0,correct:0,start:false,color:black,time:25});
      coltime=black;
    }
    else if(this.state.correct===20)
    {
      alert("you win");
      this.setState({char:arr[0],char2:arr2[0],wrong:0,correct:0,start:false,color:black,time:25});
      coltime=black;
    }
    else if(this.state.time<0)
    {
      alert("you lose");
      this.setState({char:arr[0],char2:arr2[0],wrong:0,correct:0,start:false,color:black,time:25});
      coltime=black;
    }
    else if(this.state.time<7)
    {
      coltime=red;
    }
  }
  countdown()
  {
    if(this.state.start)
   this.setState({time:this.state.time-1});
  }
  display()
  {
  if(this.state.start)
  {
  var r=random(0,25);
  this.setState({char:arr[r],char2:arr2[r]});
  this.setState({color:black});
  }
  }
  componentDidMount()
  {
    setInterval(this.display,1000);
    setInterval(this.countdown,1000);
  }
  Start()
  {
    this.setState({start:true});
  }
  render()
  {
    if(this.state.start)
    window.addEventListener("keypress",this.check,false);
    let hstyle = {
      color:this.state.color,
      fontSize:60
    }
    let timestyle = {
      color:coltime
    }
       return(
           <div align='center'>
           <button style={startstyle} onClick={this.Start}>Start</button>
           <h1 style={hstyle}>{this.state.char2}</h1>
           <h1> <p>your wrong character: {this.state.wrong}</p> <p>your correct character: {this.state.correct}</p></h1>
           <h1 style={timestyle}> Time remaining {this.state.time}</h1>
             {/*<input type="text" id="one" onKeyDown={this.handleKeyPress} />*/}
          </div>
       );
  }
  

}
export default App_targetcharacter;



// WEBPACK FOOTER //
// src/App.js