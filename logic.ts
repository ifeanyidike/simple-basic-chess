import type { CapturedPieces, PieceData } from "./definitions";
import { keys, params } from "./utils";

const getPieceType = (piece: string, dest: number[], board: string[][]) => {
  const [destRow, destCol] = dest;
  const [, type] = piece.split("");
  const destEntry: string = board[destRow][destCol];
  const [, destType] = destEntry.split("");

  if (type === destType) return true;

  return false;
};

export const isLegalMove = (
  piece: string,
  curr: number[],
  dest: number[],
  board: string[][]
) => {
  const [currRow, currCol] = curr;
  const [destRow, destCol] = dest;
  const rowIdx: number[] = Array.from(Array(params.numRows).keys());

  if (!rowIdx.includes(destRow) || !rowIdx.includes(destCol)) return false;

  const isFriendlyPiece: boolean = getPieceType(piece, dest, board);
  if (isFriendlyPiece) return false;

  console.log({
    currRow,
    currCol,
    destRow,
    destCol,
  });

  switch (piece) {
    case keys.pB:
    case keys.pW:
      return isLegalPawnMove(currRow, currCol, destRow, destCol, piece, board);
    case keys.bB:
    case keys.bW:
      return isLegalBishopMove(currRow, currCol, destRow, destCol, board);
    case keys.nB:
    case keys.nW:
      return isLegalKnightMove(currRow, currCol, destRow, destCol);
    case keys.rB:
    case keys.rW:
      return isLegalRookMove(currRow, currCol, destRow, destCol, board);
    case keys.qB:
    case keys.qW:
      return isLegalQueenMove(currRow, currCol, destRow, destCol, board);
    case keys.kB:
    case keys.kW:
      return isLegalKingMove(currRow, currCol, destRow, destCol, board);
    default:
      return false;
  }
};

const isLegalPawnMove = (
  currRow: number,
  currCol: number,
  destRow: number,
  destCol: number,
  piece: string,
  board: string[][]
) => {
  const boardPiece = board[destRow][destCol];
  const colDiff = destCol - currCol;
  if (piece === keys.pB) {
    return isLegalBlackPawnMove(currRow, destRow, boardPiece, colDiff);
  } else {
    return isLegalWhitePawnMove(currRow, destRow, boardPiece, colDiff);
  }
};

const isLegalBlackPawnMove = (
  currRow: number,
  destRow: number,
  boardPiece: string,
  colDiff: number
) => {
  const isPrevRow = destRow === currRow - 1;
  const hasOpponentCapture = boardPiece.includes(params.white);

  if (Math.abs(colDiff) === 1 && isPrevRow && hasOpponentCapture) {
    //we can capture enemy piece diagonally
    return true;
  }

  if (boardPiece !== keys.empty) return false;

  if (isPrevRow && colDiff === 0) {
    return true;
  }

  if (
    currRow === params.seventhRank &&
    destRow === params.seventhRank - 2 &&
    colDiff === 0
  ) {
    return true;
  }

  return false;
};

const isLegalWhitePawnMove = (
  currRow: number,
  destRow: number,
  boardPiece: string,
  colDiff: number
) => {
  const isNextRow = destRow === currRow + 1;
  const hasOpponentCapture = boardPiece.includes(params.black);

  if (Math.abs(colDiff) === 1 && isNextRow && hasOpponentCapture) {
    return true;
  }

  if (boardPiece !== keys.empty) return false;

  if (destRow === currRow + 1 && colDiff === 0) {
    return true;
  }

  if (
    currRow === params.secondRank &&
    destRow === params.secondRank + 2 &&
    colDiff === 0
  ) {
    return true;
  }
  return false;
};

const isPathBlocked = (
  rowDirection: number,
  colDirection: number,
  currRow: number,
  currCol: number,
  destRow: number,
  destCol: number,
  board: string[][]
) => {
  let row = currRow + rowDirection;
  let col = currCol + colDirection;

  while (row !== destRow || col !== destCol) {
    if (board[row][col]) return true;

    row += rowDirection;
    col += colDirection;
  }

  return false;
};

const isLegalBishopMove = (
  currRow: number,
  currCol: number,
  destRow: number,
  destCol: number,
  board: string[][]
) => {
  const rowDiff = destRow - currRow;
  const colDiff = destCol - currCol;

  const isOnDiagonal = Math.abs(rowDiff) === Math.abs(colDiff);

  if (!isOnDiagonal) return false;
  const rowDirection = rowDiff > 0 ? 1 : -1;
  const colDirection = colDiff > 0 ? 1 : -1;

  const pathBlocked = isPathBlocked(
    rowDirection,
    colDirection,
    currRow,
    currCol,
    destRow,
    destCol,
    board
  );

  console.log({
    rowDirection,
    colDirection,
    pathBlocked,
  });

  if (pathBlocked) return false;

  if ((rowDiff > 0 && colDiff < 0) || (rowDiff < 0 && colDiff > 0)) {
    return true;
  } else if ((rowDiff < 0 && colDiff < 0) || (rowDiff > 0 && colDiff > 0)) {
    return true;
  }

  return false;
};

const isLegalKnightMove = (
  currRow: number,
  currCol: number,
  destRow: number,
  destCol: number
) => {
  const rowDiff = Math.abs(destRow - currRow);
  const colDiff = Math.abs(destCol - currCol);

  if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
    //L-shaped move
    return true;
  }
  return false;
};

const isLegalRookMove = (
  currRow: number,
  currCol: number,
  destRow: number,
  destCol: number,
  board: string[][]
) => {
  //must move along ranks and files
  if (currRow !== destRow && currCol !== destCol) return false;
  const rowDirection = currRow === destRow ? 0 : currRow < destRow ? 1 : -1;
  const colDirection = currCol === destCol ? 0 : currCol < destCol ? 1 : -1;

  const pathBlocked = isPathBlocked(
    rowDirection,
    colDirection,
    currRow,
    currCol,
    destRow,
    destCol,
    board
  );

  console.log({
    rowDirection,
    colDirection,
    pathBlocked,
  });
  if (pathBlocked) return false;

  return true;
};

const isLegalQueenMove = (
  currRow: number,
  currCol: number,
  destRow: number,
  destCol: number,
  board: string[][]
) => {
  const bishopMove = isLegalBishopMove(
    currRow,
    currCol,
    destRow,
    destCol,
    board
  );
  const rockMove = isLegalRookMove(currRow, currCol, destRow, destCol, board);
  return bishopMove || rockMove;
};

const isLegalKingMove = (
  currRow: number,
  currCol: number,
  destRow: number,
  destCol: number,
  board: string[][]
) => {
  const rowDiff = Math.abs(destRow - currRow);
  const colDiff = Math.abs(destCol - currCol);

  if (rowDiff > 1 || colDiff > 1) return false;

  return true;
};

export const isOddCol = (x: number, y: number) => (x + y) % 2 !== 0;

export const handleDropPiece = (
  board: string[][],
  setBoard: (board: string[][]) => void,
  selectedPiece: PieceData,
  setSelectedPiece: (piece: PieceData) => void,
  piece: string,
  x: number,
  y: number,
  turn: string,
  setTurn: (t: string) => void,
  capturedPieces: CapturedPieces,
  setCapturedPieces: (pieces: CapturedPieces) => void
) => {
  if (!selectedPiece.piece || !selectedPiece.loc) return;

  const curr = selectedPiece.loc;
  const dest: number[] = [x, y];
  const currPiece: string = selectedPiece.piece;
  const legalMove: boolean = isLegalMove(currPiece, curr, dest, board);

  if (legalMove) {
    const newBoard = [...board];
    const [xi, yi] = curr;
    newBoard[xi][yi] = keys.empty;
    newBoard[x][y] = currPiece;
    setBoard(newBoard);
    handleUpdateCapturedPieces(piece, turn, capturedPieces, setCapturedPieces);

    setTurn(turn === params.white ? params.black : params.white);
    setSelectedPiece({ piece: null, loc: null });
  } else {
    console.log("not a legal move");
    setSelectedPiece({ piece: null, loc: null });
    handleSelectPiece(selectedPiece, setSelectedPiece, piece, x, y, turn);
  }
};

export const handleSelectPiece = (
  selectedPiece: PieceData,
  setSelectedPiece: (piece: PieceData) => void,
  piece: string,
  x: number,
  y: number,
  turn: string
) => {
  if (selectedPiece.piece && selectedPiece.loc && !piece) return;

  if (!piece.includes(turn)) {
    console.log(`Not your turn, ${turn} to play`);
    return;
  }
  setSelectedPiece({
    piece,
    loc: [x, y],
  });
};

const handleUpdateCapturedPieces = (
  piece: string,
  turn: string,
  capturedPieces: CapturedPieces,
  setCapturedPieces: (pieces: CapturedPieces) => void
) => {
  if ((piece && piece.includes(turn)) || piece === keys.empty) return;
  switch (turn) {
    case params.white:
      const _bPieces = {
        ...capturedPieces,
        black: [...capturedPieces.black, piece],
      };
      setCapturedPieces(_bPieces);
      break;

    case params.black:
      const _wPieces = {
        ...capturedPieces,
        white: [...capturedPieces.white, piece],
      };
      setCapturedPieces(_wPieces);
      break;
    default:
      setCapturedPieces(capturedPieces);
  }
};
