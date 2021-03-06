import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {	
	
	return (
		<button 
			className="square" 
			onClick={props.onClick}
		>		
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	// 생성자 추가하여 state 초기화
	constructor(props){
		super(props);
		
		this.state = {
			square: Array(9).fill(null),
			xIsNext: true,
		};
	}
	
	renderSquare(i) {
		return (
			<Square 
				value={this.state.square[i]}
				onClick={() => this.handleClick(i)}
			/>
		);
	}
	
	handleClick(i){
		
		if( calculateWinner(this.state.square) ){ return; }
		
		const squares = this.state.square.slice();		
		squares[i] = this.state.xIsNext ? 'X' : 'O';		
		
		this.setState({
			square : squares,
			xIsNext : !this.state.xIsNext
		});
	}
	
	resetBoard(){
		
		this.setState({
			square : Array(9).fill(null),
			xIsNext : true
		});
	}
	
	render() {
		const winner = calculateWinner(this.state.square);
		let status;
		
		if( winner ){
			status = 'Winner: ' + winner;
		}
		else{
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
		<div>
			<div className="status">{status}</div>
			<div className="board-row">
				{this.renderSquare(0)}
				{this.renderSquare(1)}
				{this.renderSquare(2)}
			</div>
			<div className="board-row">
				{this.renderSquare(3)}
				{this.renderSquare(4)}
				{this.renderSquare(5)}
			</div>
			<div className="board-row">
				{this.renderSquare(6)}
				{this.renderSquare(7)}
				{this.renderSquare(8)}
			</div>
			
			<button type="button" className="reset-btn" onClick={() => this.resetBoard() }>초기화</button>
		</div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


// 승자 판별 함수
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
