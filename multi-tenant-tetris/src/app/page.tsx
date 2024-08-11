const HEIGHT = 20;
const WIDTH = 10;

export default function Home() {
  const rowBlocks = Array.from({ length: WIDTH }, (_, i) => (
    <div key={i} className="w-8 h-8 bg-[#1d2731] border border-[#1d2731]"></div>
  ));
  const blocks = Array.from({ length: HEIGHT }, (_, i) => (
    <div key={i} className="flex justify-center">
      {rowBlocks}
    </div>
  ));

  return (
    <main className="min-h-screen p-12">
      <div className="p-12 w-full flex justify-center">
        <div className="bg-[#1d2731] flex flex-col w-80">
          {blocks}
        </div>
      </div>
    </main>
  );
}
