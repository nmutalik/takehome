export type UserTitle =
  | "GM"
  | "WGM"
  | "IM"
  | "WIM"
  | "FM"
  | "WFM"
  | "NM"
  | "CM"
  | "WCM"
  | "WNM"
  | "LM"
  | "BOT";

export type TopUser<Category extends string = "bullet"> = {
  id: string;
  username: string;
  perfs: {
    [key in Category]: {
      rating: number;
      progress: number;
    };
  };
  title?: UserTitle;
  patron?: boolean;
  online?: boolean;
};

export type GenericLeaderboard<CategoryType extends string> = {
  [category in CategoryType]: TopUser<category>[];
};

export type LeaderboardCategory =
  | "bullet"
  | "blitz"
  | "rapid"
  | "classical"
  | "ultraBullet"
  | "crazyhouse"
  | "chess960"
  | "kingOfTheHill"
  | "threeCheck"
  | "antichess"
  | "atomic"
  | "horde"
  | "racingKings";

export type Leaderboard = GenericLeaderboard<LeaderboardCategory>;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const fetchLeaderboard = async (): Promise<Leaderboard> => {
  const response = await fetch("/api/leaderboard");

  return await response.json();
};
