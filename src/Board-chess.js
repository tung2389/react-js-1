import React from 'react';
import Square from './Square-chess';

class Board extends React.Component{
    renderSquare(i){
        return <Square value={this.props.squares[i]}
         onClick={() => this.props.onClick(i)} disabled={this.props.ending}/>
    }

  renderAllSquares(){
    //const matrixSize = Math.sqrt(this.props.squares.length);
    const board = Array(8).fill(null);
    for(let i = 0; i < 8; i++){
        const squares = Array(8).fill(null);
        for(let j = 0; j < 8; j++){
            var squareKey = i * 8 + j;
            squares.push(<span key={squareKey}>{this.renderSquare(squareKey)}</span>);
        }
        board.push(<div className='up' key={i}> {squares}</div>);
    }
    return board;
  }

  render(){
    return(
      <div>
        <div>Board</div>
        <div>{this.renderAllSquares()}</div>
      </div>
    );
  }
}

export default Board;