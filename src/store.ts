import { query } from "leo-query";
import { create } from "zustand";

const fetchLeaderboard = () =>
  fetch("/api/leaderboard").then((res) => res.json());

export const useStore = create((set) => ({
  currentBoard: null,
  currentHistory: [],
  boards: {},
  leaderboard: () => query(fetchLeaderboard),
}));
