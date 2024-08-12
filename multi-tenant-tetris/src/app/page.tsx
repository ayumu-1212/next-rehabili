"use client";
import { useEffect, useState, useRef } from "react";

const HEIGHT = 20;
const WIDTH = 10;

type Address = {
  x: number;
  y: number;
}

const tetrisField = (existBlocks: Boolean[][]) => {
  const blocks = existBlocks.map((row, y) => {
    return (
      <div key={'y-' + y} className="flex justify-center">
        {row.map((block, x) => {
          if (block) {
            return <div key={'x-' + x} className="w-8 h-8 bg-[#4881C6] border border-[#1d2731]"></div>;
          }
          return <div key={'x-' + x} className="w-8 h-8 bg-[#1d2731] border border-[#1d2731]"></div>;
        })}
      </div>
    );
  });

  return (
    <div className="bg-[#1d2731] flex flex-col w-80 border-2 border-[#4881C6]">
      {blocks}
    </div>
  );
}

export default function Home() {

  const [address, setAddress] = useState<Address>({ x: 4, y: 0 });
  const [existBlocks, setExistBlocks] = useState<Boolean[][]>(Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => false)));

  const addressRef = useRef(address);

  useEffect(() => {
    addressRef.current = address;
  }, [address]);


  useEffect(() => {
    const interval = setInterval(() => {
      setAddress((prev) => {
        if (prev.y > HEIGHT - 1) {
          return { ...prev, y: 0 };
        }
        return { ...prev, y: prev.y + 1 };
      });
      setExistBlocks((prev) => {
        const newBlocks = prev.map((row, y) => {
          return row.map((block, x) => {
            if (x == addressRef.current.x && y == addressRef.current.y) {
              return true;
            } else if (x == addressRef.current.x && y == addressRef.current.y - 1 && y < HEIGHT - 1) {
              return false;
            }
            return block;
          });
        });
        return newBlocks;
      }
      );

    }, 100);
    return () => clearInterval(interval); // クリーンアップ関数でタイマーをクリア
  }, []);



  return (
    <main className="min-h-screen p-12">
      <div className="p-12 w-full flex justify-center">
        {tetrisField(existBlocks)}
      </div>
    </main>
  );
}
