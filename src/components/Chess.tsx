import { useChessStore } from "@/store";
import { Chessboard, type ChessboardOptions } from "react-chessboard";
import styles from "./Chess.module.css";
import HistoryItem from "./HistoryItem";

const Chess = () => {
  const historyList = useChessStore((state) => state.historyList);
  const historyIndex = useChessStore((state) => state.historyIndex);
  const currentBoard = useChessStore((state) => state.currentBoard);
  const setHistoryIndex = useChessStore((state) => state.setHistoryIndex);
  const onPieceDrop = useChessStore((state) => state.onPieceDrop);
  const chessboardOptions: ChessboardOptions = {
    position: currentBoard.fen,
    boardOrientation: "white" as const,
    onPieceDrop,
  };
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        <Chessboard options={chessboardOptions} />
      </div>
      <div className={styles.history}>
        {historyList.map((boardState, index) => (
          <HistoryItem
            key={boardState.hash}
            boardState={boardState}
            selected={index === historyIndex}
            onClick={() => setHistoryIndex(() => index)}
          />
        ))}
        <pre>{JSON.stringify(historyList, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Chess;
