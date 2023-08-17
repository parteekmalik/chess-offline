import { useState, useRef } from "react";
import "./chessBoard.css";

// class Chess {
//   constructor(board) {
//     this.board = board;
//     this.possibleMoves = new Array(8)
//       .fill(null)
//       .map(() => new Array(8).fill(null));
//     this.isMoved = new Array(8).fill(null).map((_, i) => {
//       return i < 2 || i > 5
//         ? new Array(8).fill(false)
//         : new Array(8).fill(true);
//     });
//     this.movesPlayed = [];
//     this.showPossibleMoves = true;
//   }
// }
const boardSize = 400;
const pieceSize = boardSize / 8;
const initialBoard = [
  ["bRk", "bKt", "bBp", "bKg", "bQn", "bBp", "bKt", "bRk"],
  ["bpawn", "bpawn", "bpawn", "bpawn", "bpawn", "bpawn", "bpawn", "bpawn"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["wpawn", "wpawn", "wpawn", "wpawn", "wpawn", "wpawn", "wpawn", "wpawn"],
  ["wRk", "wKt", "wBp", "wKg", "wQn", "wBp", "wKt", "wRk"],
];

function ChessBoard() {
  // let game = new Chess(initialBoard);
  const [boardLayout, setBoardLayout] = useState(initialBoard);
  const hardcodeloc = { row: 2, col: 0 };
  const [validMoves, setValidMoves] = useState([
    [
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
    ],
    [
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
    ],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
    ],
    [
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
      [hardcodeloc],
    ],
  ]);

  // console.log(validMoves);
  const [Hint, setHint] = useState([]);

  const showHints = (hintsList) => {
    console.log("inside show hints");
    const newHintsElements = hintsList.map((location) => {
      const { row:row, col:col } = location;
      const pieceStyle = {
        transform: `translate(${col * pieceSize}px, ${row * pieceSize}px)`,
      };

      const position = `${col},${7 - row}`;
      return (
        <div
          className={`piece hint`}
          key={position}
          id={position}
          style={pieceStyle}
        ></div>
      );
    });
    setHint(newHintsElements);
  };
  const [selectedPiece, setSelectedPiece] = useState({ row: 6, col: 1 });

  const removeHints = () => {
    
  };

  


  

  
  const handleClick = (e) => {
    console.log("inside clicked");

    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    const col = Math.floor((clientX - left) / pieceSize);
    const row = Math.floor((clientY - top) / pieceSize);

    const clickedPiece = boardLayout[row][col];

    const isHint = (row, col, list) => {
      console.log(row, col, list);
      return 0;
    };
    function isSelectedPiece(row, col) {
      return selectedPiece.row === row && selectedPiece.col === col;
    }
    const movePiece = (element) => {
      console.log("inside movePiece");
      
      console.log(element.target);
    };
    function clearSelectedPiece() {
    console.log("inside remove hints");

      setSelectedPiece({ row: -1, col: -1 });
      setHint([]);
    }
    if (isHint(row, col, validMoves[selectedPiece.row][selectedPiece.col])) {
      movePiece();
    } else if (clickedPiece && !isSelectedPiece(row, col)) {
      setSelectedPiece({ row, col });
      showHints(validMoves[row][col]);
    } else {
      clearSelectedPiece();
    }
  };

  const BoardElements = [];
  boardLayout.forEach((row, rowIndex) => {
    row.forEach((element, colIndex) => {
      if (element) {
        const pieceStyle = {
          transform: `translate(${colIndex * pieceSize}px,${
            rowIndex * pieceSize
          }px)`,
        };

        const position = `${colIndex},${7 - rowIndex}`;
        BoardElements.push(
          <div
            className={`piece ${element ? element : ""}`}
            key={position}
            id={position}
            style={pieceStyle}
          ></div>
        );
      }
    });
  });

  return (
    <>
      <div className="chess-board" onClick={handleClick}>
        {BoardElements}
        {Hint}
      </div>
    </>
  );
}

export default ChessBoard;
