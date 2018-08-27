import React from 'react';
import './App.css';

class Square extends React.Component{
    render()
    {
        return (
            <input onChange={this.onChange} />
        );
    }
}
class Board_sudoku extends React.Component{
    handleChange(i)
    {
        return <Square onChange={() => this.props.handleChange(i)} />
    }
    renderAllSquares()
    {
        const board=Array(9).fill(null);
        for(let i=0;i<9;i++)
        {
            const squares=Array(9).fill(null);
            for(let j=0;j<9;j++)
            {
                var squarekey=i*9+j;
                squares.push(<span key={squarekey}>{this.handleChange(squarekey)}</span>);
            }
            board.push(<div className='board-row' key={i}>{squares}</div>);
        }
        return board;
    }
    render()
    {
        return
        (
            <div>
                <div>{this.renderAllSquares()}</div>
            </div>
        );
    }
}
export default Board_sudoku;