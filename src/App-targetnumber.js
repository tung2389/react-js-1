import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const green = '#39D1B4';
const yellow = '#FFD712';
const red='#FF0000';
const bstyle = {
  backgroundColor:yellow,
  fontSize:60,
}
const buttonstyle = {
  backgroundColor:green,
  fontSize:90
}
const startstyle = {
  backgroundColor:red,
  fontSize:30
}
function random(min,max)
{
  let r=Math.random();
  return Math.floor(r*(max-min+1)+min);
}
let b1=random(10,60);
let b2=random(10,60);
let b3=random(10,60);
let b4=random(10,60);
let b5=random(10,60);
let b6=random(10,60);
let b7=random(10,60);
let b8=random(10,60);
let b9=random(10,60);
var arr = [b1,b2,b3,b4,b5,b6,b7,b8,b9];
let target=0;
for(let i=0;i<9;i++)
{
  target=target+arr[random(0,8)];
}
class App_targetnumber extends Component {
  constructor(props)
  {
    super(props);
    this.state={Mytarget:target,sum:0,time:20,start:false};
    this.getsum1=this.getsum1.bind(this);
    this.getsum2=this.getsum2.bind(this);
    this.getsum3=this.getsum3.bind(this);
    this.getsum4=this.getsum4.bind(this);
    this.getsum5=this.getsum5.bind(this);
    this.getsum6=this.getsum6.bind(this);
    this.getsum7=this.getsum7.bind(this);
    this.getsum8=this.getsum8.bind(this);
    this.getsum9=this.getsum9.bind(this);
    this.Start=this.Start.bind(this);
    this.countdown=this.countdown.bind(this);
    this.restart=this.restart.bind(this);
    this.Reset=this.Reset.bind(this);
  }
  Reset()
  {
    this.setState({sum:0,Mytarget:target,time:20,start:false});
      b1=random(10,60);
      b2=random(10,60);
      b3=random(10,60);
      b4=random(10,60);
      b5=random(10,60);
      b6=random(10,60);
      b7=random(10,60);
      b8=random(10,60);
      b9=random(10,60);
      arr = [b1,b2,b3,b4,b5,b6,b7,b8,b9];
      target=0;
      for(let i=0;i<9;i++)
      {
      target+=arr[random(0,8)];
      }
    }

  componentDidUpdate()
  {
    if(this.state.sum>this.state.Mytarget||this.state.time<0)
    {
      alert('you lose');
      this.Reset();
    }
    else if(this.state.sum===this.state.Mytarget)
    {
      alert('you win');
      this.Reset();
    }
  }
  countdown()
  {
    if(this.state.start)
   this.setState({time:this.state.time-1});
  }
  componentDidMount()
  {
    setInterval(this.countdown,1000);
  }
  Start()
  {
    this.setState({start:true});
  }
  getsum1()
  {
    let newsum=this.state.sum+b1;
    this.setState({sum:newsum});
  }
  getsum2()
  {
    let newsum=this.state.sum+b2;
    this.setState({sum:newsum});
  }
  getsum3()
  {
    let newsum=this.state.sum+b3;
    this.setState({sum:newsum});
  }
  getsum4()
  {
    let newsum=this.state.sum+b4;
    this.setState({sum:newsum});
  }
  getsum5()
  {
    let newsum=this.state.sum+b5;
    this.setState({sum:newsum});
  }
  getsum6()
  {
    let newsum=this.state.sum+b6;
    this.setState({sum:newsum});
  }
  getsum7()
  {
    let newsum=this.state.sum+b7;
    this.setState({sum:newsum});
  }
  getsum8()
  {
    let newsum=this.state.sum+b8;
    this.setState({sum:newsum});
  }
  getsum9()
  {
    let newsum=this.state.sum+b9;
    this.setState({sum:newsum});
  }
  restart()
  {
    this.setState({start:false});
    alert('the game has been restart !');
    this.Reset();
  }
render()
{
  let visibility = this.state.start ? 'visible' : 'hidden';
  let hstyle = {
    visibility: visibility
  };
  return(
    <div>
    <h1 align='center'><button onClick={this.Start} style={startstyle}>Start</button></h1>
    <h1 align='center'><button onClick={this.restart} style={startstyle}>Restart</button></h1>
    <h1 align='center'>Time remaining: {this.state.time}</h1>
    <h1 align='center'><button style={buttonstyle}>{this.state.Mytarget}</button></h1>
    <h1 align='center'  style={hstyle}>
    <button onClick={this.getsum1} style={bstyle}>{b1}</button>
    <button onClick={this.getsum2} style={bstyle}>{b2}</button>
    <button onClick={this.getsum3} style={bstyle}>{b3}</button>
    </h1>
    <h1 align='center'  style={hstyle}>
    <button onClick={this.getsum4} style={bstyle}>{b4}</button>
    <button onClick={this.getsum5} style={bstyle}>{b5}</button>
    <button onClick={this.getsum6} style={bstyle}>{b6}</button>
    </h1>
    <h1 align='center'  style={hstyle}>
    <button onClick={this.getsum7} style={bstyle}>{b7}</button>
    <button onClick={this.getsum8} style={bstyle}>{b8}</button>
    <button onClick={this.getsum9} style={bstyle}>{b9}</button>
    </h1>
    <h1 align='center'>Total sum:{this.state.sum}</h1>
    </div>
  );
}
}
export default App_targetnumber;