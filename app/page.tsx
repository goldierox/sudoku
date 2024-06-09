import Image from "next/image";
import { Difficulty } from "./lib/definitions";

export default function Home() {
  let difficulties = Object.values(Difficulty);
  return (
    <main className="home-page flex items-center justify-center h-screen">
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold text-black">Sudoku</h1>
        <p className="text-black mt-4 mb-4">Try this game to pass the time when you'd rather be doing something else but can't</p>
        <div className="dificulty-buttons flex flex-col flex-1 items-center justify-center">
          {difficulties.map(difficulty => renderDifficultyButton(difficulty))}
        </div>
      </div>
    </main>
  );
}

function renderDifficultyButton(difficulty: Difficulty) {
  return (
    <button
      key={Difficulty[difficulty]}
      className="btn btn-blue w-40 mt-4">
        {difficulty}
    </button>
  )
}
