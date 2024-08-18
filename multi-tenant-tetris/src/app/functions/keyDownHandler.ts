import { WIDTH } from "../config"

type Props = {
  setAddress: React.Dispatch<React.SetStateAction<{ x: number; y: number; }>>;
  placedBlocksRef: React.MutableRefObject<boolean[][]>;
}

export const newKeyDownHandler = ({ setAddress, placedBlocksRef }: Props) => {
  return (e: React.KeyboardEvent<HTMLDivElement>) => {
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
}