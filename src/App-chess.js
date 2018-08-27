import React from 'react';
import Board from './Board-chess';
import {rand} from './random';
let defaultx=rand(0,8);
let defaulty=rand(0,8);
let defaultco=defaultx*8+defaulty;
class App_chess extends React.Component{
  constructor(props){//a. Hiển thị lịch sử kèm với vị trí đã chọn:*/
    super(props);
    this.state = {
      squares: Array(80).fill('normal'),
      vis:Array(80).fill(0),
      presum:defaultco,
      cnt:0,
      time:20,
      start:false,
      undomove:Array(80).fill(0),
      curx:defaultx,
      cury:defaulty,
    };
    this.handleClick=this.handleClick.bind(this);
    this.start=this.start.bind(this);
    this.restart=this.restart.bind(this);
    this.countdown=this.countdown.bind(this);
    this.undo=this.undo.bind(this);
  }
  undo()
  {
    let move=this.state.undomove.slice();
    let squares=this.state.squares.slice();
    let viss=this.state.vis.slice();
    let cnt1=this.state.cnt;
    let pos2=move[cnt1-1];
    squares[move[cnt1-1]]='horse';
    viss[this.state.presum]=0;
    squares[this.state.presum]='normal';
    let cnt2=this.state.cnt-1;
    if(cnt2<0)
    {
      alert('no move to undo');
    }
    else
    {
    this.setState({
      presum:pos2,
      squares:squares,
      vis:viss,
      cnt:cnt2,
    });
  }
}
  restart()
  {
  alert('the game has been restarted');
  defaultx=rand(0,8);
  defaulty=rand(0,8);
  defaultco=defaultx*8+defaulty;
    this.setState({
      squares: Array(80).fill('normal'),
      vis:Array(80).fill(0),
      presum:defaultco,
      cnt:0,
      time:20,
      start:false,
      curx:defaultx,
      cury:defaulty,
    });
  }
  countdown()
  {
    if(this.state.start)
    {
      let time2=this.state.time-1;
      this.setState({time:time2});
    }
  }
  componentDidMount()
  {
    setInterval(this.countdown,1000);
  }
  start()
  {
    let newundo=this.state.undomove.slice();
    if(this.state.start===false)
    {
    let squares=this.state.squares.slice();
    let viss=this.state.vis.slice();
    for(let i=0;i<=63;i++)
    {
      viss[i]=0;
    }
    for(let i=64;i<=80;i++)
    {
      viss[i]=1;
    }
    squares[defaultco]='horse';
    viss[defaultco]=1;
    newundo[0]=defaultco;
    this.setState({squares:squares,vis:viss,undomove:newundo,start:true});
  }
}
  handleClick(i){
    let undo2=this.state.undomove.slice();
    let squares = this.state.squares.slice();
    let viss=this.state.vis.slice();
    let pre=this.state.presum;
    let posx,posy;
    for(let k=0;k<8;k++)
    {
      for(let j=0;j<8;j++)
      {
        if(k*8+j===i)
        {
          posx=k;
          posy=j;
          break;
        }
      }
    }
    if((Math.abs(posx-this.state.curx)===2 && Math.abs(posy-this.state.cury)===1)||(Math.abs(posx-this.state.curx)===1 && Math.abs(posy-this.state.cury)===2))
    {
      if(viss[i]===0)
      {
      squares[i]='horse';
      squares[this.state.presum]='died';
      viss[i]=1;
      let cnt2=this.state.cnt+1;
      undo2[cnt2]=i;
      this.setState({
        squares: squares,
        vis:viss,
        presum:i,
        cnt:cnt2,
        undomove:undo2,
        curx:posx,
        cury:posy,
      });
    }
    else
    {
      alert('invalid move,you has moved to this cell before');
    }
  }
    else
    {
      alert('invalid move,your movement is not a horse step');
    }
  }
  componentDidUpdate()
  {
    let pos=this.state.presum;
    let viss2=this.state.vis.slice();
    let pre=this.state.presum;
    /*if(this.state.time===0)
    {
      alert('You lose,time over');
      this.restart();
    }
    else
    {*/
    if(this.state.cnt===63)
    {
      alert('You win');
      this.restart();
    }
    else
    {
      let vis=this.state.vis.slice();
      let check=false;
      for (let i = 0; i < 8; i++)
        {
        	for (let j = 0; j < 8; j++)
        	{
        		if ((Math.abs(this.state.curx - i) === 2 && Math.abs(this.state.cury - j) === 1) || (Math.abs(this.state.curx - i) === 1 && Math.abs(this.state.cury - j) === 2))
        		{
        			if (vis[i*8+j] === 0)
        			{
        				check = true;
        			}
        		}
        	}
        }
        if (check===false)
        {
          alert("You lose,no movement is valid now");
          this.restart();
        }
        }
        }
  render(){
    const squares = this.state.squares.slice();
    var vision=(this.state.start===true) ?'visible':'hidden';
    let style= {
      visibility:vision
    }
    return(
      <div className='center'>
        <h1 align='center'><button onClick={this.start}>Start</button></h1>
        <h1 align='center'><button onClick={this.restart}>Restart</button></h1>
        {/*--<h1 align='center'>Remaining Time: {this.state.time}</h1>*/}
        <div align='center' style={style}><Board squares={squares} onClick={i => this.handleClick(i)} /></div>
        <h1 align='center'><button onClick={this.undo}>Undo</button></h1>
        </div>
    );
  }
}
export default App_chess;