import { useChessStore } from "@/store";
import { Chessboard, type ChessboardOptions } from "react-chessboard";
import styles from "./Chess.module.css";
import HistoryList from "./HistoryList";

const Chess = () => {
  const currentBoard = useChessStore((state) => state.currentBoard);
  const onPieceDrop = useChessStore((state) => state.onPieceDrop);
  const chessboardOptions: ChessboardOptions = {
    position: currentBoard.fen,
    onPieceDrop,
  };
  return (
    <div className={styles.container}>
      <Chessboard options={chessboardOptions} />
      <HistoryList />
    </div>
  );
};

export default Chess;
