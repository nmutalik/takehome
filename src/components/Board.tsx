import { useChessStore } from "@/store";
import { Chessboard, type ChessboardOptions } from "react-chessboard";
import styles from "./Board.module.css";
import HistoryList from "./HistoryList";

const CHESS_STYLES = {
  width: 600,
};

const Board = () => {
  const currentBoard = useChessStore((state) => state.currentBoard);
  const onPieceDrop = useChessStore((state) => state.onPieceDrop);
  const chessboardOptions: ChessboardOptions = {
    position: currentBoard.fen,
    onPieceDrop,
    boardStyle: CHESS_STYLES,
  };
  return (
    <div className={styles.container}>
      <Chessboard options={chessboardOptions} />
      <HistoryList />
    </div>
  );
};

export default Board;
