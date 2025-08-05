import { hook, query } from "leo-query";
import { create } from "zustand";

import type { DraggingPieceDataType } from "react-chessboard";
import { combine } from "zustand/middleware";
import { fetchLeaderboard, type LeaderboardCategory } from "./api";
import { chessJS } from "./constants";
import type { BoardState, ChessStore } from "./types";

const getBoardState = (
  san?: string,
  piece?: DraggingPieceDataType
): BoardState => {
  const fen = chessJS.fen();
  const hash = chessJS.hash();
  return { hash, fen, san, piece };
};

const INITIAL_STATE = getBoardState();

export const useChessStore = create<ChessStore>(
  combine(
    {
      currentBoard: INITIAL_STATE,
      historyIndex: 0,
      historyList: [INITIAL_STATE] as BoardState[],
      leaderboardCategory: "bullet" as LeaderboardCategory,
    },
    (set) => ({
      setHistoryIndex: (indexMutator) =>
        set((state) => {
          const historyIndex = indexMutator(state.historyIndex);
          const { historyList } = state;
          const currentBoard = historyList[historyIndex];
          if (!currentBoard) {
            // this is also guarded by the UI, so should never run
            return {};
          }
          chessJS.load(currentBoard.fen);
          return { currentBoard, historyIndex };
        }),
      onPieceDrop: ({ piece, sourceSquare, targetSquare }) => {
        if (!targetSquare) {
          return false;
        }

        try {
          const { san } = chessJS.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q",
          });
          set((state) => {
            const { historyList, historyIndex } = state;
            const newHistoryList = historyList.slice(0, historyIndex + 1);

            const newBoard = getBoardState(san, piece);

            newHistoryList.push(newBoard);
            return {
              currentBoard: newBoard,
              historyIndex: historyIndex + 1,
              historyList: newHistoryList,
            };
          });
          return true;
        } catch (error) {
          console.error("Invalid move:", error);
          return false;
        }
      },
      leaderboard: query(fetchLeaderboard, () => []),
      setLeaderboardCategory: (category: LeaderboardCategory) =>
        set(() => ({
          leaderboardCategory: category,
        })),
    })
  )
);

export const useChessStoreAsync = hook(useChessStore);
