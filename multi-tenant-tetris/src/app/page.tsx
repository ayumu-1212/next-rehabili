const HEIGHT = 20;
const WIDTH = 10;

const tetrisField = () => {
  const rowBlocks = Array.from({ length: WIDTH }, (_, i) => (
    <div key={i} className="w-8 h-8 bg-[#1d2731] border border-[#1d2731]"></div>
  ));
  const blocks = Array.from({ length: HEIGHT }, (_, i) => (
    <div key={i} className="flex justify-center">
      {rowBlocks}
    </div>
  ));

  return (
    <div className="bg-[#1d2731] flex flex-col w-80 border-2 border-[#4881C6]">
      {blocks}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen p-12">
      <div className="p-12 w-full flex justify-center">
        {tetrisField()}
      </div>
    </main>
  );
}
