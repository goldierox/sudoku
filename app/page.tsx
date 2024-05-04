import Image from "next/image";

export default function Home() {
  return (
    <main className="home-page flex items-center justify-center h-screen">
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold">Sudoku</h1>
        <div>Try this game to pass the time when you'd rather be doing something else but can't</div>
        <div className="dificulty-buttons flex flex-col flex-1 items-center justify-center">
          <button className="btn btn-blue w-40 mt-4">Easy</button>
          <button className="btn btn-blue w-40 mt-4">Medium</button>
          <button className="btn btn-blue w-40 mt-4">Hard</button>
        </div>
      </div>
    </main>
  );
}
