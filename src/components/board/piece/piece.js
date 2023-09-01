import "./piece.css";

const MakePiece = (props) => {
  const { row, col, pieceName, pieceSize, position } = props;
  const pieceStyle = {
    transform: `translate(${col * pieceSize}px, ${row * pieceSize}px)`,
  };

  return (
    <div
      className={`piece ${pieceName}`}
      id={`${row},${col}`}
      style={pieceStyle}
    ></div>
  );
};
export default MakePiece;
