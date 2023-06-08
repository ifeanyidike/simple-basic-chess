import "tailwindcss/tailwind.css";
import type { CapturedPieces, PieceData } from "@component/definitions";
import { handleDropPiece, handleSelectPiece, isOddCol } from "@component/logic";
import { PIECES, params } from "@component/utils";

type Pieces = {
  board: string[][];
  setBoard: (board: string[][]) => void;
  turn: string;
  setTurn: (e: string) => void;
  selectedPiece: PieceData;
  setSelectedPiece: (piece: PieceData) => void;
  capturedPieces: CapturedPieces;
  setCapturedPieces: (pieces: CapturedPieces) => void;
};
const Board = (props: Pieces) => {
  const {
    board,
    selectedPiece,
    setSelectedPiece,
    turn,
    setTurn,
    setBoard,
    capturedPieces,
    setCapturedPieces,
  } = props;

  const handleMakeMove = (x: number, y: number) => {
    const piece: string = board[x][y];

    handleSelectPiece(selectedPiece, setSelectedPiece, piece, x, y, turn);
    handleDropPiece(
      board,
      setBoard,
      selectedPiece,
      setSelectedPiece,
      piece,
      x,
      y,
      turn,
      setTurn,
      capturedPieces,
      setCapturedPieces
    );
  };

  return (
    <div className="w-[100vmin] h-[90%] m-auto border border-solid border-gray-500">
      {board.map((row, x: number) => (
        <div key={x} className={`flex h-[calc(100%/${params.numRows})]`}>
          {row.map((_, y: number) => (
            <button
              key={`${x}-${y}`}
              className={`w-[calc(100%/${params.numRows})] ${
                isOddCol(x, y) ? "bg-gray-500" : "bg-white"
              } text-gray-950 sm:text-7xl text-4xl cursor-pointer border border-solid border-gray-500 flex justify-center items-center disabled:opacity-50`}
              dangerouslySetInnerHTML={{
                __html: PIECES[board[x][y]],
              }}
              onClick={() => handleMakeMove(x, y)}
            ></button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
