import MakePiece from "./piece/piece";

import { useState } from "react";
import "./chessBoard.css";

const boardSize = 400;
const pieceSize = boardSize / 8;
const initialBoard = [
  ["bRk", "bKt", "bBp", "bKg", "bQn", "bBp", "bKt", "bRk"],
  ["bpawn", "bpawn", "bpawn", "bpawn", "bpawn", "bpawn", "bpawn", "bpawn"],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ["wpawn", "wpawn", "wpawn", "wpawn", "wpawn", "wpawn", "wpawn", "wpawn"],
  ["wRk", "wKt", "wBp", "wKg", "wQn", "wBp", "wKt", "wRk"],
];

function ChessBoard() {
  const [boardLayout, setBoardLayout] = useState(initialBoard);
  const [validMoves, setValidMoves] = useState([[]]);
  const [hint, setHint] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState({ row: -1, col: -1 });



  const handleClick = (event) => {
    console.log("inside clicked");
    const { clientX, clientY, currentTarget } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    const col = Math.floor((clientX - left) / pieceSize);
    const row = Math.floor((clientY - top) / pieceSize);

    const clickedPiece = boardLayout[row][col];
    // console.log()
    if (selectedPiece.row !== -1 && isValid(row, col)) {
      movePiece(row, col);
    } else if (clickedPiece && !isSelectedPiece(row, col)) {
      setSelectedPiece({ row, col });
      console.log(validMoves,row,col,validMoves[row][col])
      showHints(validMoves[row][col]);
    } else {
      clearSelectedPiece();
    }
  };

  const movePiece = (row, col) => {
    const boardCopy = [...boardLayout];

    boardCopy[row][col] = boardCopy[selectedPiece.row][selectedPiece.col];
    boardCopy[selectedPiece.row][selectedPiece.col] = null;

    setBoardLayout(boardCopy);
    clearSelectedPiece();
  };
  const isValid = (row, col) => {
    const listToCheck = validMoves[selectedPiece.row][selectedPiece.col];
    console.log(validMoves)
    return listToCheck.some(
      (location) => location.row === row && location.col === col
    );
  };
  const isSelectedPiece = (row, col) => {
    return selectedPiece.row === row && selectedPiece.col === col;
  };
  const clearSelectedPiece = () => {
    setSelectedPiece({ row: -1, col: -1 });
    setHint([]);
  };
  

  const generateBoardElements = () => {
    return boardLayout.map((row, rowIndex) =>
      row.map((piece, colIndex) => {
        const position = `${rowIndex},${colIndex}`;
        return piece ? (
          <MakePiece
            key={position}
            row={rowIndex}
            col={colIndex}
            pieceName={piece}
            pieceSize={pieceSize}
          />
        ) : null;
      })
    );
  };
  const showHints = (hintsList) => {
    const newHints = hintsList.map((location) => {
      const { row, col } = location;
      const position = `${row},${col}`;
      return (
        <MakePiece
          key={position}
          row={row}
          col={col}
          pieceName={"hint"}
          pieceSize={pieceSize}
        />
      );
    });
    setHint(newHints);
  };
  return (
    <div className="chess-board" onClick={handleClick}>
      {generateBoardElements()}
      {hint}
    </div>
  );
}

export default ChessBoard;
