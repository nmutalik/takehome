import type { LeaderboardCategory, TopUser } from "@/api";
import { useChessStore, useChessStoreAsync } from "@/store";

import clsx from "clsx";
import styles from "./Leaderboard.module.css";

type CategoryDisplay = {
  name: string;
  key: LeaderboardCategory;
};

const DISPLAY_ORDER: CategoryDisplay[] = [
  { name: "Bullet", key: "bullet" },
  { name: "Blitz", key: "blitz" },
  { name: "Rapid", key: "rapid" },
  { name: "Classical", key: "classical" },
  { name: "Ultra Bullet", key: "ultraBullet" },
  { name: "Crazyhouse", key: "crazyhouse" },
  { name: "Chess960", key: "chess960" },
  { name: "King of the Hill", key: "kingOfTheHill" },
  { name: "Three Check", key: "threeCheck" },
  { name: "Antichess", key: "antichess" },
  { name: "Atomic", key: "atomic" },
  { name: "Horde", key: "horde" },
  { name: "Racing Kings", key: "racingKings" },
];

const LOW_RATING = Math.log(2200);
const HIGH_RATING = Math.log(3500);
const getRatingColor = (rating: number) => {
  const normalized =
    (Math.log(rating) - LOW_RATING) / (HIGH_RATING - LOW_RATING);
  const lightness = 1 - normalized * 0.15; // 0.85 to 1
  const chroma = normalized * 0.15;
  return `oklch(${lightness} ${chroma} 86.77)`;
};

const getProgressColor = (progress: number) => {
  const normalized = progress / Math.max(100, Math.abs(progress));
  const hue = normalized > 0 ? "160deg" : "20deg"; // green and red in OKLCH space
  const chroma = `${Math.abs(normalized * 100)}%`;
  return `oklch(0.95 ${chroma} ${hue})`;
};

const Leaderboard = () => {
  const leaderboardCategory = useChessStore(
    (state) => state.leaderboardCategory
  );
  const setLeaderboardCategory = useChessStore(
    (state) => state.setLeaderboardCategory
  );
  const leaderboard = useChessStoreAsync((state) => state.leaderboard);
  const players = leaderboard[leaderboardCategory] as TopUser<
    typeof leaderboardCategory
  >[];
  return (
    <div className={styles.container}>
      <div className={styles.categoryWrapper}>
        {DISPLAY_ORDER.map((category) => (
          <div
            key={category.key}
            className={clsx(
              styles.category,
              category.key == leaderboardCategory && styles.active
            )}
            onClick={() => setLeaderboardCategory(category.key)}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className={styles.leaderboard}>
        {players.map((player, index) => {
          const {
            title,
            username,
            perfs: {
              [leaderboardCategory]: { rating, progress },
            },
          } = player;

          return (
            <div key={player.id} className={styles.player}>
              <div className={styles.rank}>{index + 1}</div>
              <div className={styles.title}>{title}</div>
              <a
                href={`https://lichess.org/@/${username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.username}>{username}</div>
              </a>
              <div
                className={styles.rating}
                style={{
                  backgroundColor: getRatingColor(rating),
                }}
              >
                {rating}
              </div>
              <div
                className={styles.progress}
                style={{ backgroundColor: getProgressColor(progress) }}
              >
                {progress}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
