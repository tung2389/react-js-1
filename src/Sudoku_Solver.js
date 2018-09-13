import React from 'react';
//import Board from './Board';
import './App.css';
function createBoard()
{
  let board = Array(9);
  for(let i=0;i<9;i++)
  {
    let subarray = Array(9).fill(0);
    board[i]=subarray;
  }
  return board;
}
class App_sudoku_solver extends React.Component{
  constructor(props)
  {
      super(props);
      this.state = {
        squares : createBoard(),///*this.createBoard(),*/ /*Array(9).fill(Array(9).fill(0))*/[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],
        IsEnd:false
      }
      this.handleChange=this.handleChange.bind(this);
      this.SafeBox=this.SafeBox.bind(this);
      this.SafeCol=this.SafeCol.bind(this);
      this.SafeRow=this.SafeRow.bind(this);
      this.isSafe=this.isSafe.bind(this);
      this.findvalid=this.findvalid.bind(this);
      this.backtrack=this.backtrack.bind(this);
      this.solve=this.solve.bind(this);
      this.check=this.check.bind(this);
      this.restart=this.restart.bind(this);
  }
  /*createBoard()
  {
    const board = Array(9).fill(null);
    for(let i=0;i<9;i++)
    {
      const subarray = Array(9).fill(0);
      board.push(subarray);
    }
    return board;
  }*/
  findvalid()
  {
    const board=this.state.squares.slice();
    for(let i=0;i<9;i++)
    {
      for(let j=0;j<9;j++)
      {
        if(board[i][j]===0||isNaN(board[i][j]))
        return true;
      }
    }
    return false;
  }
  SafeBox(startrow,startcol,num)
  {
    const board = this.state.squares.slice();
    for(let i=0;i<3;i++)
    {
        for(let j=0;j<3;j++)
        {
            if(board[startrow+i][startcol+j]===num)
                return false;
        }
    }
    return true;
  }
  SafeRow(row,num)
  {
    const board = this.state.squares.slice();
    for(let i=0;i<9;i++)
    {
        if(board[row][i]===num)
            return false;
    }
    return true;
  }
  SafeCol(col,num)
  {
    const board = this.state.squares.slice();
    for(let i=0;i<9;i++)
    {
        if(board[i][col]===num)
            return false;
    }
    return true;
  }
   isSafe(row,col,num)
   {
    return (this.SafeRow(row,num) === true && this.SafeCol(col,num) === true && this.SafeBox(row-row%3,col-col%3,num) === true);
   }
   check()
   {
     const board = this.state.squares.slice();
       for(let k=0;k<7;k=k+3)
       {
         for(let d=0;d<7;d+=3)
         {
           const mark=Array(12).fill(0);
         for(let i=k;i<k+3;i++)
         {
         for(let j=d;j<d+3;j++)
         {
           if(mark[board[i][j]]===0)
           {
             if(board[i][j]!==0)
             mark[board[i][j]]=1;
           }
           else
           {
             if(!isNaN(board[i][j]))
             return false;
           }
         }
       }
      }
     }
     for(let i=0;i<9;i++)
     {
       const mark=Array(12).fill(0);
       for(let j=0;j<9;j++)
       {
         if(board[i][j]<0||board[i][j]>9)
         return false;
         if(mark[board[i][j]]===0)
         {
           if(board[i][j]!==0)
           mark[board[i][j]]=1;
         }
         else
         if(!isNaN(board[i][j]))
         return false;
       }
     }
     for(let j=0;j<9;j++)
     {
      const mark=Array(12).fill(0);
       for(let i=0;i<9;i++)
       {
        if(mark[board[i][j]]===0)
        {
          if(board[i][j]!==0)
          mark[board[i][j]]=1;
        }
        else
        if(!isNaN(board[i][j]))
        return false;
       }
     }
     return true;
   }
   backtrack()
   {
    if(this.state.IsEnd === true)
    return true;
    //this board is copied by reference
    const board = this.state.squares.slice();
    let row,col;
    if(!this.findvalid())
        {
          this.setState({IsEnd:true});
          return true;
        }
    let ok=false;
    for(let i=0;i<9;i++)
    {
      if(ok)
      break;
      for(let j=0;j<9;j++)
      {
        if(board[i][j] === 0 || isNaN(board[i][j]))
        {
          row=i;
          col=j;
          ok=true;
          break;
        }
      }
    }
    for(let num=1;num<=9;num++)
    {
        if(this.isSafe(row,col,num))
        {
            board[row][col]=num;
            if(this.backtrack())
            {
              return true;
            }
            board[row][col]=0;
        }
    }
    return false;
}
restart()
{
  let board=this.state.squares.slice();
  for(let i=0;i<9;i++)
  {
    for(let j=0;j<9;j++)
    {
      board[i][j]=0;
    }
  }
  this.setState({IsEnd:false});
}
solve()
{
  if(!this.check())
  {
    alert("Can't solve, make sure that you don't break rules of sudoku");
  }
  else
  {
  if(this.backtrack())
  {
    alert("Solved!");
  }
  else
  {
    alert("Can't solve");
  }
}
}
  handleChange(x,y,val)
  {
    const anosquares=this.state.squares.slice();
    anosquares[x][y]=val;
    this.setState({squares:anosquares});
  }
  render(){
    const cur = this.state.squares.slice();
    const board=Array(9).fill(null);
    for(let i=0;i<9;i++)
    {
      const subarray=Array(9).fill(null);
      for(let j=0;j<9;j++)
      {
        var subkey=i*9+j;
        subarray.push(
          <input 
          type="number"
          className="inpstyle"
          key={subkey}
          onChange = {event => this.handleChange(
            i,
            j,
            parseInt(event.target.value)
          )}
          disabled={this.state.IsEnd}
          value={cur[i][j]}
          />
        )
      }
      board.push(<div className="board-row" key={i}>{subarray}</div>);
    }
    return(
      <div align='center'>
      <h1>Sudoku solver - Created by <a href="https://www.facebook.com/profile.php?id=100006826129122">Lưu Khánh Tùng</a> from HSGS </h1>
      <button className="abc" onClick={this.solve}>Solve</button>
      <button className="abc" onClick={this.restart}>Restart</button>
      <div className="game">{board}</div>
      <div className="game-info">
        </div>
      </div>
    );
  }
}

export default App_sudoku_solver;
