export default function LeaderboardCard() {
    return (
      <div className="p-4 bg-white shadow rounded-xl">
        <p>🥇 Alex – 560 reps</p>
        <p>🥈 You – 510 reps</p>
        <p>🥉 Ravi – 490 reps</p>
        <a href="/leaderboard" className="text-blue-500 text-sm mt-2 block">View Full Leaderboard →</a>
      </div>
    );
  }