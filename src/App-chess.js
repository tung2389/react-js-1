import React from 'react';
import Board from './Board-chess';
import {rand} from './random';
let defaultx=rand(0,8);
let defaulty=rand(0,8);
let defaultco=defaultx*8+defaulty;
function create_board(x)
{
  let board = Array(8);
  for(let i=0;i<8;i++)
  {
    let subarray = Array(9).fill(x);
    board[i]=subarray;
  }
  return board;
}
class App_chess extends React.Component{
  constructor(props){//a. Hiển thị lịch sử kèm với vị trí đã chọn:*/
    super(props);
    this.state = {
      squares: create_board("normal"),
      vis:create_board(0),
      cnt:0,
      time:20,
      start:false,
      undomovex:Array(80).fill(0),
      undomovey:Array(80).fill(0),
      curx:defaultx,
      cury:defaulty,
      hasAlert:false,
    };
    this.handleClick=this.handleClick.bind(this);
    this.start=this.start.bind(this);
    this.restart=this.restart.bind(this);
    this.countdown=this.countdown.bind(this);
    this.undo=this.undo.bind(this);
    this.mark=this.mark.bind(this);
  }
  mark(curx,cury)
  {
    let board=this.state.squares.slice();
    let vis=this.state.vis.slice();
    for(let i=0;i<8;i++)
    {
      for(let j=0;j<8;j++)
      {
        if(((Math.abs(i - curx) === 2 && Math.abs(j - cury) === 1) || (Math.abs(i - curx) === 1 && Math.abs(j - cury) === 2)) && vis[i][j] === 0)
        board[i][j]="cancome";
        else
        {
          if((i !== curx || j !== cury) && board[i][j] !== 'died')
          {
            board[i][j] = 'normal';
          }
        }
    }
  }
  this.setState({squares:board});
}
  undo()
  {
    let cnt2=this.state.cnt-1;
    if(cnt2<0)
    {
      alert('no move to undo');
    }
    else
    {
    let movex=this.state.undomovex.slice();
    let movey=this.state.undomovey.slice();
    let squares=this.state.squares.slice();
    let viss=this.state.vis.slice();
    let cnt1=this.state.cnt;
    let posx=movex[cnt1-1];
    let posy=movey[cnt1-1];
    squares[posx][posy]='horse';
    viss[this.state.curx][this.state.cury]=0;
    squares[this.state.curx][this.state.cury]='normal';
    let cnt2=this.state.cnt-1;
    this.setState({
      curx:posx,
      cury:posy,
      squares:squares,
      vis:viss,
      cnt:cnt2,
    });
    this.mark(posx,posy);
  }
}
  restart()
  {
  alert('the game has been restarted');
  defaultx=rand(0,8);
  defaulty=rand(0,8);
  let board = this.state.squares.slice();
  let viss = this.state.vis.slice();
  for(let i=0;i<8;i++)
  {
    for(let j=0;j<8;j++)
    {
      if(i===defaultx && j===defaulty)
      {
        board[i][j]='horse';
        viss[i][j]=1;
      }
      else
      {
        board[i][j]='normal';
        viss[i][j]=0;
      }
    }
  }
    this.setState({
      squares: board,
      vis:viss,
      cnt:0,
      time:20,
      start:false,
      curx:defaultx,
      cury:defaulty,
      hasAlert:false,
    });
    this.mark(defaultx,defaulty);
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
    if(this.state.start===false)
    {
    let board = this.state.squares.slice();
    let movex = this.state.undomovex.slice();
    let movey = this.state.undomovey.slice();
    let viss = this.state.vis.slice();
    viss[defaultx][defaulty]=1;
    movex[0]=defaultx;
    movey[0]=defaulty;
    board[defaultx][defaulty]='horse';
    this.setState({squares:board,start:true,undomovex:movex,undomovey:movey,vis:viss});
    this.mark(defaultx,defaulty);
    }
  }
  handleClick(x,y){
    let movex = this.state.undomovex.slice();
    let movey = this.state.undomovey.slice();
    let squares = this.state.squares.slice();
    let viss=this.state.vis.slice();
    if((Math.abs(x-this.state.curx)===2 && Math.abs(y-this.state.cury)===1)||(Math.abs(x-this.state.curx)===1 && Math.abs(y-this.state.cury)===2))
    {
      if(viss[x][y]===0)
      {
      squares[x][y]='horse';
      squares[this.state.curx][this.state.cury]='died';
      viss[x][y]=1;
      let cnt2=this.state.cnt+1;
      movex[cnt2]=x;
      movey[cnt2]=y;
      this.setState({
        squares: squares,
        vis:viss,
        cnt:cnt2,
        undomovex:movex,
        undomovey:movey,
        curx:x,
        cury:y,
      });
      this.mark(x,y);
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
        			if (vis[i][j] === 0)
        			{
        				check = true;
        			}
        		}
        	}
        }
        if (check===false && this.state.hasAlert===false)
        {
          this.setState({hasAlert:true});
          alert("You lose,no movement is valid now");
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
        <div align='center' style={style}><Board squares={squares} onClick={(x,y) => this.handleClick(x,y)} /></div>
        <h1 align='center'><button onClick={this.undo} disabled={this.state.hasAlert}>Undo</button></h1>
        </div>
    );
  }
}
export default App_chess;
