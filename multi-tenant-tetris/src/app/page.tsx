"use client";
import { useEffect, useState, useRef } from "react";
import { TetrisField } from "./components/TetrisField";
import { WIDTH, HEIGHT, SPEED } from "./config"
import { newKeyDownHandler } from "./functions/keyDownHandler";
import { newStartGameHandler } from "./functions/startGameHandler";

type Address = {
  x: number;
  y: number;
}

export default function Home() {
  const [address, setAddress] = useState<Address>({ x: 4, y: -1 });
  const [placedBlocks, setPlacedBlocks] = useState<boolean[][]>(Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => false)));
  const [isGameOver, setIsGameOver] = useState(false);
  const addressRef = useRef(address);
  const placedBlocksRef = useRef(placedBlocks);
  useEffect(() => {
    addressRef.current = address;
  }, [address]);
  useEffect(() => {
    placedBlocksRef.current = placedBlocks;
  }, [placedBlocks]);

  const keyDownHandler = newKeyDownHandler({ setAddress, placedBlocksRef });
  const startGameHandler = newStartGameHandler({ setAddress, setPlacedBlocks, setIsGameOver, addressRef, placedBlocksRef });
  const existBlocks = placedBlocksRef.current.map(v => v.map(v2 => v2));
  if (addressRef.current.y >= 0) {
    existBlocks[addressRef.current.y][addressRef.current.x] = true;
  }

  return (
    <main className="min-h-screen p-12">
      <div className="p-12 w-full flex justify-center" tabIndex={0} onKeyDown={keyDownHandler}>
        <TetrisField existBlocks={existBlocks} isGameOver={isGameOver} />
      </div>
      <div className="flex justify-center">
        <button className="bg-[#4881C6] text-white p-2 rounded" onClick={startGameHandler}>Start</button>
      </div>
    </main>
  );
}
