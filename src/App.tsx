import { Suspense, useState } from "react";

import Leaderboard from "./components/Leaderboard";

import styles from "./App.module.css";

type Pane = {
  name: string;
  key: string;
  component: React.ComponentType;
};

const PANES: Pane[] = [
  {
    name: "Leaderboard",
    key: "leaderboard",
    component: Leaderboard,
  },
];
function App() {
  const [selectedPane, setSelectedPane] = useState(0);
  const SelectedComponent = PANES[selectedPane].component;

  return (
    <div className={styles.app}>
      <div className={styles.paneSelector}>
        {PANES.map((pane, index) => (
          <div
            key={pane.key}
            className={`${styles.pane} ${
              selectedPane === index ? styles.active : ""
            }`}
            onClick={() => setSelectedPane(index)}
          >
            {pane.name}
          </div>
        ))}
      </div>
      <div className={styles.content}>
        <Suspense fallback={<div>Loading...</div>}>
          <SelectedComponent />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
