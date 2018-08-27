import React from 'react';
import logo from './logo.svg';
import './App.css';
import {rand} from './random';
const n=28;
const m=54;
let defx=rand(0,26);
let defy=rand(0,52);
let foodx=rand(1,26);
let foody=rand(1,52);
let board = [];
let snakex = [];
let snakey = [];
snakex.push(defx);
snakey.push(defy);
let snakelength=1;
for(let i=0;i<n;i++)
{
  let subarray = [];
  for(let j=0;j<m;j++)
  {
  if(i === defx && j===defy)
  subarray.push(<button className="snake2" />);
  else if(i===foodx && j===foody)
  {
    subarray.push(<button className="food" />);
  }
  else
  {
  if(i===n-1||j===m-1||i===0||j===0)
  subarray.push(<button className="squareline" />);
  else
  subarray.push(<button className="square2" />);
  }
}
board.push(<div className="board-row">{subarray}</div>)
}

class App_snake extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      boardsn: board,
      dir:4,
      start:false,
    }
    this.move=this.move.bind(this);
    this.EatFood=this.EatFood.bind(this);
    this.changedir=this.changedir.bind(this);
    this.isSnakeDied=this.isSnakeDied.bind(this);
    this.start=this.start.bind(this);
  }
  start()
  {
    if(this.state.start===false)
    {
    this.interval=setInterval(this.move,100);
    this.setState({start:true});
    }
  }
  changedir(event)
  {
    if(event.keyCode===119)
    {
      if(this.state.dir!==3)
      {
      this.setState({dir:1});
    }
    }
    else if(event.keyCode===100)
    {
      if(this.state.dir!==4)
      {
      this.setState({dir:2});
      }
    }
    else if(event.keyCode===115)
    {
      if(this.state.dir!==1)
      {
      this.setState({dir:3});
      }
    }
    else if(event.keyCode===97)
    {
      if(this.state.dir!==2)
      {
      this.setState({dir:4});
      }
    }
  }
  EatFood()
  {
    if(snakex[0]===foodx && snakey[0]===foody)
    {
      if(this.state.dir===1)
      {
        let newx=snakex[0]+snakelength;
        snakex.push(newx);
        snakey.push(snakey[snakelength-1]);
        snakelength=snakelength+1;
      }
      else if(this.state.dir===2)
      {
        let newy=snakey[0]-snakelength;
        snakey.push(newy);
        snakex.push(snakex[snakelength-1]);
        snakelength=snakelength+1;
      }
      else if(this.state.dir===3)
      {
        let newx=snakex[0]-snakelength;
        snakex.push(newx);
        snakey.push(snakey[snakelength-1]);
        snakelength=snakelength+1;
      }
      else if(this.state.dir===4)
      {
        let newy=snakey[0]+snakelength;
        snakey.push(newy);
        snakex.push(snakex[snakelength-1]);
        snakelength=snakelength+1;
      }
      foodx=rand(1,26);
      foody=rand(1,52);
    }
  }
  isSnakeDied()
  {
    for(let i=0;i<snakelength;i++)
    {
      for(let j=0;j<snakelength;j++)
      {
        if(snakex[i]===snakex[j] && snakey[i]===snakey[j] && i!==j)
        {
        alert("You lose");
        foodx=rand(0,26);
        foody=rand(0,52);
        defx=rand(0,26);
        defy=rand(0,52);
        snakex = [];
        snakey = [];
        snakex.push(defx);
        snakey.push(defy);
        snakelength=1;
        clearInterval(this.interval);
        this.setState({start:false});
      }
    }
  }
  }
  move()
  {
    let boardsn = [];
    this.EatFood();
    this.isSnakeDied();
    if(this.state.dir===1)
    {
      defx=defx-1;
    }
    else if(this.state.dir===2)
    {
      defy=defy+1;
    }
    else if(this.state.dir===3)
    {
      defx=defx+1;
    }
    else if(this.state.dir===4)
    {
      defy=defy-1;
    }
    if(defx<1) defx=n-2;
    if(defy<1) defy=m-2;
    if(defx>n-2) defx=1;
    if(defy>m-2) defy=1;
    snakex.unshift(defx);
    snakey.unshift(defy);
    if(snakex.length>snakelength)
    {
      snakex.pop();
      snakey.pop();
    }
    for(let i=0;i<n;i++)
    {
      let subarray = [];
      for(let j=0;j<m;j++)
      {
        let ok = false;
        let vis=Array(n).fill(0);
        for(let k=0;k<snakelength;k++)
        {
          if(i===snakex[k] && j===snakey[k])
          {
          if(vis[i]===0)
          {
          if(k===0)
          subarray.push(<button className="snakehead" />);
          else
          subarray.push(<button className="snake2" />);
          vis[i]=1;
          }
          ok=true;
          }
        }
        if(ok===false)
        {
          if(i===foodx && j===foody)
          {
            subarray.push(<button className="food" />);
          }
          else
          {
          if(i===n-1||j===m-1||i===0||j===0)
          subarray.push(<button className="squareline" />);
          else
          subarray.push(<button className="square2" />);
          }
        }
      }
      boardsn.push(<div className="board-row">{subarray}</div>);
  }
  this.setState({boardsn:boardsn});
  }
  render()
  {
    window.addEventListener("keypress",this.changedir,false);
    return(
      <div>
        <div align='center'><button onClick={this.start}>Start</button></div>
        <div align='center'>Your Score:{(snakelength-1)*100}</div>
        {this.state.boardsn}
      </div>
    );
  }
}
export default App_snake;
