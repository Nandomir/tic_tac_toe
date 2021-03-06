import React from 'react';
import ReactDOM from 'react-dom'
import Square from './Square.jsx'



class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
      moves: 0

    }
  }


  handleClick(i) {
    const newSquares = this.state.squares.slice()
    newSquares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({ squares: newSquares, xIsNext: !this.state.xIsNext, moves: this.state.moves + 1})
    if(this.calculateWinner(this.state.squares) || this.state.moves >= 9){
      this.newGame()
    }
    
  }


  renderSquare(i){
    return <Square 
      value= { this.state.squares[i] } 
      onClick={ () => this.handleClick(i) } />
  }

  calculateWinner(squares){
    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
  ]
  for (let i=0; i < winningLines.length; i++){
    const [a,b,c] = winningLines[i]
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];

      }
    }
  return null;
  }

  newGame(){
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
      moves: 0

    })
  }



  render() {
    const winner = this.calculateWinner(this.state.squares)
    let status;
    let draw;
    if(this.state.moves > 8 && winner === null){
      draw = " ITS A DRAW!"
    }
    if(winner){
      status = "Player " + winner + " Wins!"
    } else {
      status = 'Player Turn: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>  
        <div className="row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="status">{status}</div>
        <div className="Draw">{draw}</div>

      </div>
      )
  }
}

export default Board