import { HEIGHT, WIDTH, SPEED } from "../config";

type Props = {
  setAddress: React.Dispatch<React.SetStateAction<{ x: number; y: number; }>>;
  setPlacedBlocks: React.Dispatch<React.SetStateAction<boolean[][]>>;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  addressRef: React.MutableRefObject<{ x: number; y: number; }>;
  placedBlocksRef: React.MutableRefObject<boolean[][]>;
}

export const newStartGameHandler = ({ setAddress, setPlacedBlocks, setIsGameOver, addressRef, placedBlocksRef }: Props) => {
  return () => {
    setAddress({ x: 4, y: 0 });
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
        // ゲームオーバー判定
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
    }, SPEED);
  }
}