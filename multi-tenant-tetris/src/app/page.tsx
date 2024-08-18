"use client";
import { useEffect, useState, useRef } from "react";
import { TetrisField } from "./components/TetrisField";
import { SP } from "next/dist/shared/lib/utils";

const HEIGHT = 20;
const WIDTH = 10;

const SPEED = 100;

type Address = {
  x: number;
  y: number;
}

export default function Home() {
  const [address, setAddress] = useState<Address>({ x: 4, y: 0 });
  const [placedBlocks, setPlacedBlocks] = useState<Boolean[][]>(Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => false)));
  const [isGameOver, setIsGameOver] = useState(false);

  const addressRef = useRef(address);
  const placedBlocksRef = useRef(placedBlocks);

  useEffect(() => {
    addressRef.current = address;
  }, [address]);
  useEffect(() => {
    placedBlocksRef.current = placedBlocks;
    console.log(placedBlocksRef.current);
  }, [placedBlocks]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (addressRef.current.y >= HEIGHT - 1 || placedBlocksRef.current[addressRef.current.y + 1][addressRef.current.x]) {
        // もしブロックが一列揃ったら消す
        if (addressRef.current.y == HEIGHT - 1 && placedBlocksRef.current[HEIGHT - 1].every((v, i) => i == addressRef.current.x ? true : v)) {
          const newBlocks = [Array.from({ length: WIDTH }, () => false), ...placedBlocksRef.current.slice(0, HEIGHT - 1)];
          setPlacedBlocks(newBlocks);
        } else {
          setPlacedBlocks((prev) => {
            return prev.map((row, y) => {
              return row.map((block, x) => {
                if (x == addressRef.current.x && y == addressRef.current.y) {
                  return true;
                }
                return block;
              });
            });
          });
        }
        // 
        if (addressRef.current.x == 4 && addressRef.current.y == 0) {
          setIsGameOver(true);
          clearInterval(interval);
        }
      }
      setAddress((prev) => {
        if (prev.y >= HEIGHT - 1 || placedBlocksRef.current[prev.y + 1][prev.x]) {
          return { x: 4, y: 0 };
        }
        return { ...prev, y: prev.y + 1 };
      });
      console.log('intervaling');
    }, SPEED);
    return () => clearInterval(interval);
  }, []);

  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.code;

    if (key === 'ArrowUp') {
      console.log('key is ArrowUp');
    }

    if (key === 'ArrowDown') {
      console.log('key is ArrowDown');
    }

    if (key === 'ArrowLeft') {
      setAddress((address) =>
        address.x > 0 && !placedBlocksRef.current[address.y][address.x - 1] ? { ...address, x: address.x - 1 } : address
      );
    }

    if (key === 'ArrowRight') {
      setAddress((address) =>
        address.x < WIDTH - 1 && !placedBlocksRef.current[address.y][address.x + 1] ? { ...address, x: address.x + 1 } : address
      );
    }
  }

  const existBlocks = placedBlocksRef.current.map(v => v.map(v2 => v2));
  existBlocks[addressRef.current.y][addressRef.current.x] = true;

  return (
    <main className="min-h-screen p-12">
      <div className="p-12 w-full flex justify-center" tabIndex={0} onKeyDown={keyDownHandler}>
        <TetrisField existBlocks={existBlocks} isGameOver={isGameOver} />
      </div>
    </main>
  );
}
