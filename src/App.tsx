import { Suspense, useState } from "react";

import Leaderboard from "./components/Leaderboard";

import styles from "./App.module.css";
import Board from "./components/Board";

type Pane = {
  name: string;
  key: string;
  component: React.ComponentType;
};

const PANES: Pane[] = [
  {
    name: "Chess",
    key: "chess",
    component: Board,
  },
  {
    name: "Leaderboard",
    key: "leaderboard",
    component: Leaderboard,
  },
];

const getInitialPane = () => {
  const paneKey = window.location.hash.replace("#", "");
  return Math.max(
    PANES.findIndex((pane) => pane.key === paneKey),
    0
  );
};

function App() {
  const [selectedPane, setSelectedPane] = useState(() => getInitialPane());
  const SelectedComponent = PANES[selectedPane].component;

  const selectPane = (index: number) => {
    setSelectedPane(index);
    window.location.hash = PANES[index].key;
  };

  return (
    <div className={styles.app}>
      <div className={styles.paneSelector}>
        {PANES.map((pane, index) => (
          <div
            key={pane.key}
            className={`${styles.pane} ${
              selectedPane === index ? styles.active : ""
            }`}
            onClick={() => selectPane(index)}
          >
            {pane.name}
          </div>
        ))}
      </div>
      <div className={styles.content}>
        <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
          <SelectedComponent />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
