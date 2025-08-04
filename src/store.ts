import { hook, query, type Query } from "leo-query";
import { create } from "zustand";

import { combine } from "zustand/middleware";
import {
  fetchLeaderboard,
  type Leaderboard,
  type LeaderboardCategory,
} from "./api";
import { chessJS } from "./constants";

type BoardState = {
  hash: string;
  fen: string;
  san?: string;
};

type ChessStore = {
  currentBoard: BoardState;
  historyIndex: number;
  historyList: string[];
  historyLookup: Record<string, BoardState>;

  goToBoard: (historyIndex: number) => void;
  tryMove: (move: string) => void;

  leaderboard: Query<ChessStore, Leaderboard>;
  leaderboardCategory: LeaderboardCategory;
  setLeaderboardCategory: (category: LeaderboardCategory) => void;
};

const getBoardState = (san?: string): BoardState => {
  const fen = chessJS.fen();
  const hash = chessJS.hash();
  return { hash, fen, san };
};

const INITIAL_STATE = getBoardState();

export const useChessStore = create<ChessStore>(
  combine(
    {
      currentBoard: INITIAL_STATE,
      historyIndex: 0,
      historyList: [] as string[],
      historyLookup: { [INITIAL_STATE.hash]: INITIAL_STATE },
      leaderboardCategory: "bullet" as LeaderboardCategory,
    },
    (set) => ({
      goToBoard: (historyIndex: number) =>
        set((state) => {
          const { historyList, historyLookup } = state;
          const boardId = historyList[historyIndex];
          const currentBoard = historyLookup[boardId];
          return { currentBoard, historyIndex };
        }),
      tryMove: (move: string) => {
        try {
          const { san } = chessJS.move(move);
          set((state) => {
            const { historyList, historyLookup, historyIndex } = state;
            const newHistoryList = historyList.slice(0, historyIndex + 1);

            const newBoard = getBoardState(san);

            const newHistoryLookup = {
              ...historyLookup,
              [newBoard.hash]: newBoard,
            };
            newHistoryList.push(newBoard.hash);
            return {
              currentBoard: newBoard,
              historyIndex: historyIndex + 1,
              historyList: newHistoryList,
              historyLookup: newHistoryLookup,
            };
          });
        } catch (error) {
          console.error("Invalid move:", error);
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
