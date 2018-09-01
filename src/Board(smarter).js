import React from 'react';
import Square from './Square';
import './App.css';
class Board extends React.Component{
    renderSquare(x,y){
        return <Square but={this.props.but(x,y)} value={this.props.squares[x][y]}
         onClick={() => this.props.onClick(x,y)} ending={this.props.ending}/>
    }

  renderAllSquares(){
    const matrixSize = 20;
    const board = Array(matrixSize).fill(null);
    for(let i = 0; i < matrixSize; i++){
        const squares = Array(matrixSize).fill(null);
        for(let j = 0; j < matrixSize; j++){
            var squareKey = i * matrixSize + j;
            var x=i;
            var y=j;
            squares.push(<span key={squareKey}>{this.renderSquare(x,y)}</span>);
        }
        board.push(<div className="board-row" key={squareKey}> {squares}</div>);
    }
    return board;
  }

  render(){
    return(
      <div>
        <div>{this.renderAllSquares()}</div>
      </div>
    );
  }
}

export default Board;