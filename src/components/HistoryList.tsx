import { useChessStore } from "@/store";
import styles from "./History.module.css";
import HistoryItem from "./HistoryItem";

const HistoryList = () => {
  const historyList = useChessStore((state) => state.historyList);
  const historyIndex = useChessStore((state) => state.historyIndex);
  const setHistoryIndex = useChessStore((state) => state.setHistoryIndex);
  return (
    <div className={styles.container}>
      {historyList.map((boardState, index) => (
        <HistoryItem
          key={boardState.hash}
          boardState={boardState}
          selected={index === historyIndex}
          onClick={() => setHistoryIndex(() => index)}
        />
      ))}
    </div>
  );
};

export default HistoryList;
