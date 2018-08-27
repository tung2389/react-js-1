import React from 'react';
import Board from './Board';
import './App.css';
class App_tic_tac_toe extends React.Component{
  constructor(props){//a. Hiển thị lịch sử kèm với vị trí đã chọn:*/
    super(props);
    this.state = {
      squares: Array(400).fill(null),
      xIsNext: true,
      stepNumber: 0,
      win:0,
      disable:false,
      undomove:Array(400).fill(0),
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
  }
  undo()
  {
    const squares=this.state.squares.slice();
    let undomove2=this.state.undomove.slice();
    let cnt=this.state.stepNumber;
    let pos=undomove2[cnt];
    squares[pos]=null;
    pos=pos-1;
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
  handleClick(i){
    const squares = this.state.squares.slice();
    let undomove2=this.state.undomove.slice();
    let cnt=this.state.stepNumber+1;
    if(squares[i]===null)
    {
    if(this.state.xIsNext)
    squares[i]='X';
    else
    squares[i]='O';
    undomove2[cnt]=i;
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      stepNumber: this.state.stepNumber + 1,
      undomove:undomove2,
    });
  }
  }
  check(i)
  {
    const squares = this.state.squares.slice();
    if((i===this.state.a||i===this.state.b||i===this.state.c||i===this.state.d||i===this.state.e) && this.state.disable)
    return 'red'
    else
    {
    if(squares[i]==='X')
    return 'square';
    else
    {
    return 'square3';
    }
    }
  }
  componentDidUpdate()
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
}
restart()
{
    const squares=this.state.squares.slice();
    let undomove2=this.state.undomove.slice();
    let cnt=this.state.stepNumber;
    let xIsNext=this.state.xIsNext;
    xIsNext=true;
    for(let i=0;i<400;i++)
    {
      squares[i]=null;
      undomove2[i]=0;
      cnt=0;
    }
    this.setState({
      squares:squares,
      undomove:undomove2,
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
      <div className="game"><Board but={i => this.check(i)} squares={squares} onClick={i => this.handleClick(i)} ending={endd}/></div>
      <button onClick={this.undo} disabled={endd}>Undo</button>
      <div className="game-info">
          <p>{status}</p>
        </div>
      </div>
    );
  }
}

export default App_tic_tac_toe;