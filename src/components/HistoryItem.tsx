import type { BoardState } from "@/types";
import { defaultPieces } from "react-chessboard";

import clsx from "clsx";
import styles from "./History.module.css";

type HistoryItemProps = {
  boardState: BoardState;
  onClick: () => void;
  selected?: boolean;
};

const renderPieceIcon = (boardState: BoardState) => {
  if (!boardState?.piece?.pieceType) {
    return <svg style={{ width: 30, height: 30 }} />;
  }
  const ChessPiece = defaultPieces[boardState.piece.pieceType];
  return (
    <ChessPiece svgStyle={{ width: 30, height: 30 }} key={boardState.hash} />
  );
};

const HistoryItem = ({ boardState, onClick, selected }: HistoryItemProps) => {
  const icon = renderPieceIcon(boardState);

  return (
    <div
      className={clsx(styles.historyItem, selected && styles.selected)}
      key={boardState.hash}
      onClick={onClick}
    >
      {icon}
      <span className={styles.historySan}>{boardState.san || "Start"}</span>
    </div>
  );
};

export default HistoryItem;
