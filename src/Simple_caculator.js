import React, { Component } from 'react';
import './App.css';
import Board from './Caculator_board';
var square = create_board(6,4);
function create_board(n,m)
{
  var array = Array(n);
  for(let i=0;i<n;i++)
  {
    let subarray = Array(m);
    array[i] = subarray;
  }
  for(let i=0;i<n-1;i++)
  {
    for(let j=0;j<m-1;j++)
    {
      array[i][j] = i*(m-1) + j + 1;
    }
  }
  array[0][3] = "/";
  array[1][3] = "*";
  array[2][3] = "-";
  array[3][3] = "+";
  array[3][0] = "0";
  array[3][1] = ".";
  array[3][2] = "=";
  array[4][0] = "AC";
  array[4][1] = "DEL";
  array[4][2] = "sqrt";
  array[4][3] = "%";
  array[5][0] = "(";
  array[5][1] = ")";
  array[5][2] = "00";
  array[5][3] = "Off";
  return array;
}

class Simple_caculator extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      expression: ""
    }
    this.ClickEvent = this.ClickEvent.bind(this);
  }
  ClickEvent(x,y)
  {
    if(square[x][y] !== "=" && square[x][y] !== "AC" && square[x][y] !== "sqrt" && square[x][y] !== "DEL" && square[x][y] !== "Off" && square[x][y]!== "On")
    this.setState({expression : this.state.expression.toString() + square[x][y]});
    else if(square[x][y] === "=")
    {
      try
      {
      let s = eval(this.state.expression);
      this.setState({expression : s});
      }
      catch(e)
      {
        alert("wrong expression");
      }
    }
    else if(square[x][y] === "AC")
    {
      this.setState({expression : ""});
    }
    else if(square[x][y] === "sqrt")
    {
      try
      {
      this.setState({expression : Math.sqrt(eval(this.state.expression)).toString()});
      }
      catch(e)
      {
        alert("wrong expression");
      }
    }
    else if(square[x][y] === "DEL")
    {
      this.setState({expression :this.state.expression.slice(0,this.state.expression.length - 1)});
    }
    else if(square[x][y] === "On")
    {
      this.setState({expression : ""});
      square[5][3] = "Off";
    }
    else if(square[x][y] === "Off")
    {
      this.setState({expression : ""});
      square[5][3] = "On";
    }
  }
  render() {

    var style = {
      visibility : (square[5][3] === "On") ? "hidden" : "visible" ,
    }
    return (
      <div align = "center">
         <h1>Simple caculator created by <a href="https://www.facebook.com/profile.php?id=100006826129122"><font color="green">Lưu Khánh Tùng</font></a> from HSGS</h1>
         <input style={style} value = {this.state.expression}></input>
        <Board n={6} m ={4} square = {square} onClick = {(x,y) => this.ClickEvent(x,y)}/>
      </div>
    );
  }
}

export default Simple_caculator;
