"use client";
import { useEffect, useState, useRef } from "react";
import { TetrisField } from "./components/TetrisField";

const HEIGHT = 20;
const WIDTH = 10;

type Address = {
  x: number;
  y: number;
}

export default function Home() {
  const [address, setAddress] = useState<Address>({ x: 4, y: 0 });
  const [existBlocks, setExistBlocks] = useState<Boolean[][]>(Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => false)));

  const addressRef = useRef(address);
  const existBlocksRef = useRef(existBlocks);

  useEffect(() => {
    addressRef.current = address;
  }, [address]);
  useEffect(() => {
    existBlocksRef.current = existBlocks;
  }, [existBlocks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAddress((prev) => {
        if (prev.y == HEIGHT - 1 || existBlocksRef.current[prev.y + 1][prev.x]) {
          return { ...prev, y: 0 };
        }

        if (prev.y == HEIGHT - 1 || prev.y < HEIGHT - 1 && !existBlocksRef.current[prev.y + 1][prev.x]) {
          return { ...prev, y: prev.y + 1 };
        }
        return prev;
      });
      setExistBlocks((prev) => {
        const newBlocks = prev.map((row, y) => {
          return row.map((block, x) => {
            if (x == addressRef.current.x && y == addressRef.current.y) {
              return true;
            } else if (x == addressRef.current.x && y == addressRef.current.y - 1 && y < HEIGHT - 1 && !prev[y + 1][x]) {
              return false;
            }
            return block;
          });
        });
        return newBlocks;
      }
      );

    }, 300);
    return () => clearInterval(interval); // クリーンアップ関数でタイマーをクリア
  }, []);



  return (
    <main className="min-h-screen p-12">
      <div className="p-12 w-full flex justify-center">
        {TetrisField(existBlocks)}
      </div>
    </main>
  );
}
