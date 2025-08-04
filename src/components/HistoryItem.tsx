import type { BoardState } from "@/types";
import { defaultPieces } from "react-chessboard";

import styles from "./HistoryItem.module.css";

type HistoryItemProps = {
  boardState: BoardState;
  onClick: () => void;
  selected?: boolean;
};

const renderPieceIcon = (boardState: BoardState) => {
  if (!boardState?.piece?.pieceType) {
    return null;
  }
  const ChessPiece = defaultPieces[boardState.piece.pieceType];
  return <ChessPiece svgStyle={{ height: 30 }} key={boardState.hash} />;
};

const HistoryItem = ({ boardState, onClick }: HistoryItemProps) => {
  const icon = renderPieceIcon(boardState);

  return (
    <div className={styles.historyItem} key={boardState.hash} onClick={onClick}>
      {icon}
      <span className={styles.historySan}>{boardState.san || "No move"}</span>
    </div>
  );
};

export default HistoryItem;
