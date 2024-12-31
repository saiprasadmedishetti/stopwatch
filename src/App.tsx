import { useState } from "react";
import Circle from "./components/circle";

function App() {
  const [duration, setDuration] = useState(60);
  const [isPlay, setIsPlay] = useState(true);

  const handleCount = () => {
    setIsPlay((prev) => !prev);
  };

  const onComplete = () => {
    setIsPlay(false);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Circle duration={duration} isPlay={isPlay} onComplete={onComplete} />
      <div className="flex gap-3 mt-4">
        <input
          type="text"
          className="border h-12 w-20 border-green-900 focus:border-green-700 outline-0 p-4 rounded-lg font-semibold bg-gray-950 disabled:select-none"
          inputMode="numeric"
          value={duration}
          onChange={(e) => setDuration(+e.target.value.replace(/[^0-9]/, ""))}
          autoFocus
          disabled={isPlay}
        />
        <button
          className="bg-green-600 px-4 py-2 h-12 rounded-lg"
          onClick={handleCount}
        >
          {isPlay ? "Stop" : "Start"}
        </button>
      </div>
    </main>
  );
}

export default App;
