import { useChessStore } from "@/store";
import {
  Chessboard,
  defaultPieces,
  type ChessboardOptions,
} from "react-chessboard";
import styles from "./Chess.module.css";

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
        {historyList.map((boardState, index) => {
          let icon = null;
          if (boardState?.piece?.pieceType) {
            const ChessPiece = defaultPieces[boardState.piece.pieceType];
            icon = (
              <ChessPiece svgStyle={{ height: 30 }} key={boardState.hash} />
            );
          }
          return (
            <div
              className={styles.historyItem}
              key={boardState.hash}
              onClick={() => setHistoryIndex(() => index)}
            >
              {icon}
              <span className={styles.historySan}>
                {boardState.san || "No move"}
              </span>
            </div>
          );
        })}
        <pre>{JSON.stringify(historyList, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Chess;
