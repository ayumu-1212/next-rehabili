"use client";
import { useEffect, useState } from "react";

const HEIGHT = 20;
const WIDTH = 10;

type Address = {
  x: number;
  y: number;
}

const tetrisField = (existBlock: Address) => {
  const rowBlocks = (y: number) => {
    return Array.from({ length: WIDTH }, (_, x) => {
      if (existBlock.x === x && existBlock.y === y) {
        return <div key={'x-' + x} className="w-8 h-8 bg-[#4881C6] border border-[#1d2731]"></div>;
      }
      return <div key={'x-' + x} className="w-8 h-8 bg-[#1d2731] border border-[#1d2731]"></div>;
    });
  };
  const blocks = Array.from({ length: HEIGHT }, (_, y) => (
    <div key={'y-' + y} className="flex justify-center">
      {rowBlocks(y)}
    </div>
  ));

  return (
    <div className="bg-[#1d2731] flex flex-col w-80 border-2 border-[#4881C6]">
      {blocks}
    </div>
  );
}

export default function Home() {

  const [address, setAddress] = useState<Address>({ x: 4, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setAddress((prev) => {
        if (prev.y > HEIGHT - 1) {
          return { ...prev, y: 0 };
        }
        return { ...prev, y: prev.y + 1 };
      });
    }, 1000);
    return () => clearInterval(interval); // クリーンアップ関数でタイマーをクリア
  }, []);


  return (
    <main className="min-h-screen p-12">
      <div className="p-12 w-full flex justify-center">
        {tetrisField(address)}
      </div>
    </main>
  );
}
