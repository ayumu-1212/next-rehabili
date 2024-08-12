export const TetrisField = (existBlocks: Boolean[][]) => {
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
