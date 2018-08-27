import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const blue='#4700ff';
const green = '#39D1B4';
const yellow = '#FFD712';
const source1="https://kotopaint.vn/uploads/banner-dai-ly-son-koto.jpg";
const source2="https://scontent.fhan2-3.fna.fbcdn.net/v/t34.0-12/28536365_2065549437015907_1269407837_n.png?_nc_cat=0&oh=9a7efb40ee3f90db21f30a579bc5d0e9&oe=5AD1B25F";
const styles = {
  color:      'green',
  fontSize: 100
};
class App_firstreactprogram extends Component {
  constructor(props) {
    super(props);
	this.state = { mood: 'good',color: green,picture: source1,userInput: ''};
	this.handleUserInput= this.handleUserInput.bind(this);
    this.changeColor=this.changeColor.bind(this);
    this.toggleMood = this.toggleMood.bind(this);
    this.changeSource=this.changeSource.bind(this);
    this.display=this.display.bind(this);
    this.returnDiv=this.returnDiv.bind(this);
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
 returnDiv()
 {
   return(
    <div style={styles}> This is my first react program </div>
   )
 }
  render() {
    var returnDiv=this.returnDiv();
    return (
    <div>
	 <div align="center">
   {returnDiv}
   <h1 style={styles}> {this.state.userInput} </h1>
        <input type="text" onChange={this.handleUserInput} value={this.state.userInput} />
        <button onClick={this.display}>click to display</button>
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
        <h1> du lich </h1>
        <button onClick={this.changeSource}>
        dulich
        </button>
        <h1> this is du lich </h1>
        <img src={this.state.picture} width="600px" height="600px"/>
      </div>
      </div>
    );
  }
}
  


export default App_firstreactprogram;