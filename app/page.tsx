"use client";
import { keys, params } from "@component/utils";
import Board from "./components/Board";
import { useState } from "react";
import type { CapturedPieces, PieceData } from "@component/definitions";
import CapturedItems from "./components/CapturedItems";

export default function Home() {
  const _board = [
    [keys.rW, keys.nW, keys.bW, keys.qW, keys.kW, keys.bW, keys.nW, keys.rW],
    new Array(8).fill(keys.pW),
    new Array(8).fill(keys.empty),
    new Array(8).fill(keys.empty),
    new Array(8).fill(keys.empty),
    new Array(8).fill(keys.empty),
    new Array(8).fill(keys.pB),
    [keys.rB, keys.nB, keys.bB, keys.qB, keys.kB, keys.bB, keys.nB, keys.rB],
  ];
  const [board, setBoard] = useState<string[][]>(_board);
  const [turn, setTurn] = useState<string>(params.white);
  const [selectedPiece, setSelectedPiece] = useState<PieceData>({
    piece: null,
    loc: null,
  });
  const [capturedPieces, setCapturedPieces] = useState<CapturedPieces>({
    white: [],
    black: [],
  });

  return (
    <div className="h-[100vmin] flex items-center justify-center">
      <CapturedItems type={params.black} capturedPieces={capturedPieces} />
      <div className="h-full mt-5">
        <h4 className="flex justify-center font-bold h-5 text-rose-500">
          {turn === params.white && "White to Move"}
        </h4>

        <Board
          board={board}
          setBoard={setBoard}
          turn={turn}
          setTurn={setTurn}
          selectedPiece={selectedPiece}
          setSelectedPiece={setSelectedPiece}
          capturedPieces={capturedPieces}
          setCapturedPieces={setCapturedPieces}
        />
        <h4 className="flex justify-center font-bold h-5 text-cyan-500">
          {turn === params.black && "Black to Move"}
        </h4>
      </div>
      <CapturedItems type={params.white} capturedPieces={capturedPieces} />
    </div>
  );
}
