class Chess {
  constructor(board) {
    this.board = board;
    this.possibleMoves = Array(8)
      .fill(null)
      .map(() => Array(8).fill([]));
    this.movesPlayed = [];
    this.showPossibleMoves = true;
    this.turn = "w";
    this.pieceMovement = {
      Rk: [
        { row: 1, col: 0 },
        { row: -1, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: -1 },
      ],
      Bp: [
        { row: 1, col: 1 },
        { row: -1, col: -1 },
        { row: 1, col: -1 },
        { row: -1, col: 1 },
      ],
      Kt: [
        { row: 2, col: 1 },
        { row: 2, col: -1 },
        { row: -2, col: 1 },
        { row: -2, col: -1 },
        { row: 1, col: 2 },
        { row: -1, col: 2 },
        { row: 1, col: -2 },
        { row: -1, col: -2 },
      ],
      Kg: [
        { row: 1, col: 1 },
        { row: 0, col: 1 },
        { row: -1, col: 1 },
        { row: -1, col: 0 },
        { row: -1, col: -1 },
        { row: 0, col: -1 },
        { row: 1, col: -1 },
        { row: 1, col: 0 },
      ],
      Qn: [
        { row: 1, col: 0 },
        { row: -1, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: -1 },
        { row: 1, col: 1 },
        { row: -1, col: -1 },
        { row: 1, col: -1 },
        { row: -1, col: 1 },
      ],
      pa: [], // Add pawn movement logic here
    };
    this.init();
  }

  init() {
    this.findValidMoves();
  }

  changeTurn() {
    this.turn = this.turn === "w" ? "b" : "w";
  }

  isInsideBounds(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }

  pieceOnLoc(row, col) {
    const piece = this.board[row][col];
    if (piece == null) return "empty square";
    return piece[0] === this.turn ? "friendly piece" : "opponent piece";
  }

  pieceBasicMove(row, col, move) {
    const newRow = row + move.row;
    const newCol = col + move.col;

    if (this.isInsideBounds(newRow, newCol)) {
      const response = this.pieceOnLoc(newRow, newCol);
      if (response === "empty square" || response === "opponent piece") {
        return [{ row: newRow, col: newCol }];
      }
    }
    return [];
  }

  pieceMoves(row, col) {
    const piece = this.board[row][col];
    const pieceType = piece.substring(1, 3);
    const moves = [];

    for (const move of this.pieceMovement[pieceType]) {
      const moveResults =
        pieceType === "Rk" || pieceType === "Bp" || pieceType === "Qn"
          ? this.pieceBasicMoveContinuous(row, col, move)
          : this.pieceBasicMove(row, col, move);
      moves.push(...moveResults);
    }

    this.possibleMoves[row][col] = moves;
  }

  pieceBasicMoveContinuous(row, col, move) {
    const foundMoves = [];
    let newRow = row + move.row;
    let newCol = col + move.col;

    while (this.isInsideBounds(newRow, newCol)) {
      const response = this.pieceOnLoc(newRow, newCol);
      if (response === "empty square" || response === "opponent piece") {
        foundMoves.push({ row: newRow, col: newCol });
        if (response === "opponent piece") break;
      } else {
        break;
      }
      newRow += move.row;
      newCol += move.col;
    }

    return foundMoves;
  }

  findValidMoves() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.board[i][j] && this.turn === this.board[i][j][0]) {
          this.pieceMoves(i, j);
        }
      }
    }
  }
}

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

const game = new Chess(initialBoard);
console.log(game.possibleMoves);
