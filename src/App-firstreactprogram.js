import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const blue='#4700ff';
const green = '#39D1B4';
const yellow = '#FFD712';
const source1="";
const source2="https://reactjs.org/logo-og.png";
const styles = {
  color:      'green',
  fontSize: 100
};
class App_firstreactprogram extends Component {
  constructor(props) {
    super(props);
	this.state = { mood: 'good',color: green,picture: source1,userInput: '',item : [],target:"",number:0};
	this.handleUserInput= this.handleUserInput.bind(this);
    this.changeColor=this.changeColor.bind(this);
    this.toggleMood = this.toggleMood.bind(this);
    this.changeSource=this.changeSource.bind(this);
    this.display=this.display.bind(this);
    this.returnDiv=this.returnDiv.bind(this);
    this.GetData=this.GetData.bind(this);
    this.check=this.check.bind(this);
    this.Search=this.Search.bind(this);
    this.increase=this.increase.bind(this);
}
Search(e)
{
  this.setState({target:e.target.value});
}
GetData()
{
  fetch("https://swapi.co/api/people/?format=json")
    .then(response => response.json())
    .then( ({results:items}) => {this.setState({item:items})})
}
check()
{
  this.GetData();
  console.log(this.state.item);
}
    handleUserInput(e)
  {
    this.setState({userInput : e.target.value});
  }
  changeColor()
  {
    const newColor=this.state.color === green ? yellow : green;
    this.setState({color: newColor});
  }
  toggleMood() {
    const newMood = this.state.mood === 'good' ? 'bad' : 'good';
    this.setState({ mood: newMood });
  }
  changeSource()
  {
    const newsource=this.state.picture === source1 ? source2 : source1;
    this.setState({picture:newsource});
  }
 say()
 {
   let speech='';
   for(let i=0;i<1000;i++)
   speech+='helloworld'
   alert(speech);
 }
 display()
 {
   alert(this.state.userInput);
 }
 increase()
 {
   this.setState({number:this.state.number+1});
 }
 returnDiv()
 {
   return(
    <div style={styles}> This is my first react program </div>
   )
 }
 /*<button onClick={this.GetData}>GetData</button>
      {items.map(item => <h4 key = {item.name}>{item.name}</h4>)}*/
  render() {
    var returnDiv=this.returnDiv();
    let array = this.state.item;
    if(this.state.target!=="")
    {
      array = array.filter(element => element.name.toLowerCase().includes(this.state.target.toLowerCase()))
    }
    const s = {
      fontSize : 30,
    }
    return (
    <div>
	 <div align="center">
   {returnDiv}
   <h1 style={styles}> {this.state.userInput} </h1>
        <input type="text" onChange={this.handleUserInput} value={this.state.userInput} />
        <button onClick={this.display}>click to display</button>
      </div>
      <button onClick={this.check}>GetData</button>
    <div>
    <h1> Move your mouse on the number to see the change </h1>
    <label style = {s} onMouseMove={this.increase}>{this.state.number}</label>
    <br/>
    <h1> Search box </h1>
    <input onChange = {this.Search}/>
    {array.map(element => <h4 key = {element.name}>{element.name}</h4>)}
    </div>
      <div style={{background: this.state.color}}>
        <h1>
          Change my color
        </h1>
        <button onClick={this.changeColor}>
          Change color
        </button>
        <h1>I'm feeling {this.state.mood}!</h1>
        <button onClick={this.toggleMood}>
          Click Me
        </button>
        <h1>
          this is alert :)
        </h1>
        <button onClick={this.say}>
         :)
          </button>
        <h1> Click to display image </h1>
        <button onClick={this.changeSource}>
        Image
        </button>
        <br/>
        <img src={this.state.picture}/>
      </div>
      </div>
    );
  }
}
  


export default App_firstreactprogram;
