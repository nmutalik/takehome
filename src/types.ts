import type { Query } from "leo-query";
import type {
  DraggingPieceDataType,
  PieceDropHandlerArgs,
} from "react-chessboard";
import type { Leaderboard, LeaderboardCategory } from "./api";

export type BoardState = {
  hash: string;
  fen: string;
  san?: string;
  piece?: DraggingPieceDataType;
};
export type ChessStore = {
  currentBoard: BoardState;
  historyIndex: number;
  historyList: BoardState[];

  setHistoryIndex: (indexMutator: (oldIndex: number) => number) => void;
  onPieceDrop: (args: PieceDropHandlerArgs) => boolean;

  leaderboard: Query<ChessStore, Leaderboard>;
  leaderboardCategory: LeaderboardCategory;
  setLeaderboardCategory: (category: LeaderboardCategory) => void;
};
