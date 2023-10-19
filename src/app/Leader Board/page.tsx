import React, { useState, useEffect } from 'react';

interface LeaderboardEntry {
  name: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Fetch leaderboard data from your JSON file or an API
      //fetch('/src/app/Leaderboard/Leader.json')
      //.then((response) => response.json())
      //.then((data) => setLeaderboardData(data))
      //.catch((error) => console.error('Error fetching leaderboard data:', error))
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboardData.map((entry, index) => (
          <li key={index}>
            {entry.name}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <h1>Your Game</h1>
      <Leaderboard />
      {/* Add other game components */}
    </div>
  );
};

export default App;
