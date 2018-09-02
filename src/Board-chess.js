import React from 'react';
import Square from './Square-chess';

class Board extends React.Component{
    renderSquare(x,y){
        return <Square value={this.props.squares[x][y]}
         onClick={() => this.props.onClick(x,y)} disabled={this.props.ending}/>
    }

  renderAllSquares(){
    //const matrixSize = Math.sqrt(this.props.squares.length);
    const board = Array(8).fill(null);
    for(let i = 0; i < 8; i++){
        const squares = Array(8).fill(null);
        for(let j = 0; j < 8; j++){
            var squareKey = i * 8 + j;
            squares.push(<span key={squareKey}>{this.renderSquare(i,j)}</span>);
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
