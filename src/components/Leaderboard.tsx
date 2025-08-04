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

const getProgressColor = (progress: number) => {
  const normalized = progress / Math.max(100, Math.abs(progress));
  const hue = normalized > 0 ? "160deg" : "40deg"; // green and red in OKLCH space
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
        {players.map((player) => {
          const {
            title,
            username,
            perfs: {
              [leaderboardCategory]: { rating, progress },
            },
          } = player;

          return (
            <div key={player.id} className={styles.player}>
              <div className={styles.title}>{title}</div>
              <div className={styles.username}>{username}</div>
              <div className={styles.rating}>{rating}</div>
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
      <pre>
        <code className="language-json">
          {JSON.stringify(leaderboard, null, 2)}
        </code>
      </pre>
    </div>
  );
};

export default Leaderboard;
