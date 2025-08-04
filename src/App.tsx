import { Suspense, useState } from "react";
import "./App.css";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Leaderboard />
    </Suspense>
  );
}

export default App;
