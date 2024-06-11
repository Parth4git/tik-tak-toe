import React, { useEffect, useState } from "react";
import "./style.css";

function Squares({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

const Tiktaktoe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("Next player: X");

  const calculateWinner = (squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClickValue = (index) => {
    if (squares[index] || calculateWinner(squares)) return; // Prevent clicking on already filled squares or if there's a winner

    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setStatus("Next player: X");
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus(` 🎉 Winner is: ${winner} 🎉`);
    } else if (squares.every((square) => square !== null)) {
      setStatus("Draw");
    } else {
      setStatus(`Next player: ${xIsNext ? "X" : "O"}`);
    }
  }, [squares, xIsNext]);

  return (
    <div className="container">
      <div className="row">
        <Squares value={squares[0]} onClick={() => handleClickValue(0)} />
        <Squares value={squares[1]} onClick={() => handleClickValue(1)} />
        <Squares value={squares[2]} onClick={() => handleClickValue(2)} />
      </div>
      <div className="row">
        <Squares value={squares[3]} onClick={() => handleClickValue(3)} />
        <Squares value={squares[4]} onClick={() => handleClickValue(4)} />
        <Squares value={squares[5]} onClick={() => handleClickValue(5)} />
      </div>
      <div className="row">
        <Squares value={squares[6]} onClick={() => handleClickValue(6)} />
        <Squares value={squares[7]} onClick={() => handleClickValue(7)} />
        <Squares value={squares[8]} onClick={() => handleClickValue(8)} />
      </div>
      <div>
        <h2>{status}</h2>
        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
};

export default Tiktaktoe;
