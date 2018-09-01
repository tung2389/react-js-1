import React from 'react';
import Board from './Board(smarter)';
import './App.css';
function createBoard()
{
  let board = Array(20);
  for(let i=0;i<20;i++)
  {
    let subarray = Array(20).fill(null);
    board[i]=subarray;
  }
  return board;
}
class App_tic_tac_toe extends React.Component{
  constructor(props){//a. Hiển thị lịch sử kèm với vị trí đã chọn:*/
    super(props);
    this.state = {
      squares: createBoard(),
      mark:createBoard(),
      xIsNext: true,
      stepNumber: 0,
      win:0,
      disable:false,
      undomovex:Array(400).fill(0),
      undomovey:Array(400).fill(0),
      a:0,
      b:0,
      c:0,
      d:0,
      e:0,
    };
    this.handleClick=this.handleClick.bind(this);
    this.undo=this.undo.bind(this);
    this.check=this.check.bind(this);
    this.restart=this.restart.bind(this);
    this.horizontal=this.horizontal.bind(this);
    this.vertical=this.vertical.bind(this);
    this.main_horizontal=this.main_horizontal.bind(this);
    this.not_main_horizontal=this.not_main_horizontal.bind(this);
  }
  undo()
  {
    const squares=this.state.squares.slice();
    let undomove2x=this.state.undomovex.slice();
    let undomove2y=this.state.undomovey.slice();
    let cnt=this.state.stepNumber;
    let x = undomove2x[cnt];
    let y = undomove2y[cnt];
    squares[x][y] = null;
    let xIsNext=!this.state.xIsNext;
    cnt=cnt-1;
    if(cnt>=0)
    {
    this.setState({
      squares:squares,
      xIsNext:xIsNext,
      stepNumber:cnt,
    });
  }
  }
  handleClick(x,y){
    const squares = this.state.squares.slice();
    let undomove2x=this.state.undomovex.slice();
    let undomove2y=this.state.undomovey.slice();
    let cnt=this.state.stepNumber+1;
    if(squares[x][y]===null)
    {
    if(this.state.xIsNext)
    squares[x][y]='X';
    else
    squares[x][y]='O';
    undomove2x[cnt]=x;
    undomove2y[cnt]=y;
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      stepNumber: this.state.stepNumber + 1,
      undomovex:undomove2x,
      undomovey:undomove2y,
    });
  }
  let a;
  if(this.state.xIsNext)
  a="X";
  else
  a="O";
  if(this.horizontal(x,y)||this.vertical(x,y)||this.main_horizontal(x,y)||this.not_main_horizontal(x,y))
  {
    
    this.setState({disable:true,win:a});
  }
  }
  check(x,y)
  {
    const squares = this.state.squares.slice();
    /*if((i===this.state.a||i===this.state.b||i===this.state.c||i===this.state.d||i===this.state.e) && this.state.disable)
    return 'red'
    else
    {*/
    if(squares[x][y]==='X')
    return 'square';
    else
    {
    return 'square3';
    }
    //}
  }
  horizontal(x,y)
  {
    const board = this.state.squares.slice();
    let cntleft=0;
    let cntright=0;
    for(let i=y-1;i>=0;i--)
    {
      if(board[x][i]===board[x][y])
      cntleft++;
      else
      break;
    }
    for(let i=y+1;i<20;i++)
    {
      if(board[x][i]===board[x][y])
      cntright++;
      else
      break;
    }
    if(cntleft + cntright + 1 >= 5)
    return true;
    return false;
  }
  vertical(x,y)
  {
    const board = this.state.squares.slice();
    let cntup = 0;
    let cntdown = 0;
    for(let i=x-1;i>=0;i--)
    {
      if(board[i][y]===board[x][y])
      cntup++;
      else
      break;
    }
    for(let i=x+1;i<20;i++)
    {
      if(board[i][y]===board[x][y])
      cntdown++;
      else
      break;
    }
    if(cntup + cntdown + 1 >= 5)
    return true;
    return false;
  }
  main_horizontal(x,y)
  {
    const board = this.state.squares.slice();
    let cnt1=0;
    let cnt2=0;
    let i=x,j=y;
    while(i > 0 && j > 0)
    {
      i--;
      j--;
      if(board[i][j]===board[x][y])
      cnt1++;
      else
      break;
    }
    i=x,j=y;
    while(i < 19 && j < 19)
    {
      i++;
      j++;
      if(board[i][j]===board[x][y])
      cnt2++;
      else
      break;
    }
    if(cnt1 + cnt2 + 1 >= 5)
    return true;
    return false;
  }
  not_main_horizontal(x,y)
  {
    const board = this.state.squares.slice();
    let cnt1=0;
    let cnt2=0;
    let i=x,j=y;
    while(i > 0 && j < 19)
    {
      i--;
      j++;
      if(board[i][j]===board[x][y])
      cnt1++;
      else
      break;
    }
    i=x,j=y;
    while(i < 19 && j > 0)
    {
      i++;
      j--;
      if(board[i][j]===board[x][y])
      cnt2++;
      else
      break;
    }
    if(cnt1 + cnt2 + 1 >= 5)
    return true;
    return false;
  }
  /*componentDidUpdate()
  {
    const squares=this.state.squares.slice();
    if(this.state.disable===false)
    {
    for(let i=0;i<400;i++)
    {
        if((i<400-84 && squares[i]===squares[i+21] && squares[i+21]===squares[i+42] && squares[i+42]===squares[i+63] && squares[i+63]===squares[i+84] && squares[i]!==null)||
           (i<400-80 && squares[i]===squares[i+20] && squares[i+20]===squares[i+40] && squares[i+40]===squares[i+60] && squares[i+60]===squares[i+80] && squares[i]!==null)||
           (i<400-4 && squares[i]===squares[i+1] &&squares[i+1]===squares[i+2] && squares[i+2]===squares[i+3] && squares[i+3]===squares[i+4] && squares[i]!==null)||
           (i<400-76 && squares[i]===squares[i+19] && squares[i+19]===squares[i+38] && squares[i+38]===squares[i+57] && squares[i+57]===squares[i+76] && squares[i]!==null)
        )
        {
          this.setState({win:(this.state.xIsNext===true)?"O":"X",disable:true});
          if(i<400-84 && squares[i]===squares[i+21] && squares[i+21]===squares[i+42] && squares[i+42]===squares[i+63] && squares[i+63]===squares[i+84] && squares[i]!==null)
          this.setState({a:i,b:i+21,c:i+42,d:i+63,e:i+84});
          else if(i<400-80 && squares[i]===squares[i+20] && squares[i+20]===squares[i+40] && squares[i+40]===squares[i+60] && squares[i+60]===squares[i+80] && squares[i]!==null)
          this.setState({a:i,b:i+20,c:i+40,d:i+60,e:i+80});
          else if(i<400-4 && squares[i]===squares[i+1] &&squares[i+1]===squares[i+2] && squares[i+2]===squares[i+3] && squares[i+3]===squares[i+4] && squares[i]!==null)
          this.setState({a:i,b:i+1,c:i+2,d:i+3,e:i+4});
          else if(i<400-76 && squares[i]===squares[i+19] && squares[i+19]===squares[i+38] && squares[i+38]===squares[i+57] && squares[i+57]===squares[i+76] && squares[i]!==null)
          this.setState({a:i,b:i+19,c:i+38,d:i+57,e:i+76});
          //alert("win");
        }
    }
  }
}*/
restart()
{
    const squares=this.state.squares.slice();
    let undomove2x=this.state.undomovex.slice();
    let undomove2y=this.state.undomovey.slice();
    let cnt=this.state.stepNumber;
    let xIsNext=this.state.xIsNext;
    xIsNext=true;
    for(let i=0;i<20;i++)
    {
      for(let j=0;j<20;j++)
      {
        squares[i][j]=null;
      }
    }
    for(let i=0;i<400;i++)
    {
      undomove2x[i]=0;
      undomove2y[i]=0;
    }
    this.setState({
      squares:squares,
      undomovex:undomove2x,
      undomovey:undomove2y,
      xIsNext:xIsNext,
      stepNumber:cnt,
      disable:false,
    });
}
  render(){
    const squares = this.state.squares.slice();
    //const winner = calculateWinner(squares);
    const endd=this.state.disable;
    let status;
    if(this.state.disable){
    status = "Winner is: " + this.state.win;
  }
     else if(this.state.stepNumber === 400){
      status = "Draw game";
    }else{
      status = "Next player is: " + (this.state.xIsNext ? 'X' : 'O');
    }
    return(
      <div align='center'>
      <button onClick={this.restart}>Restart</button>
      <div className="game"><Board but={(x,y) => this.check(x,y)} squares={squares} onClick={(x,y) => this.handleClick(x,y)} ending={endd}/></div>
      <button onClick={this.undo} disabled={endd}>Undo</button>
      <div className="game-info">
          <p>{status}</p>
        </div>
      </div>
    );
  }
}

export default App_tic_tac_toe;