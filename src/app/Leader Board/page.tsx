import React, { useState, useEffect } from 'react';

interface LeaderboardEntry {
  name: string;
  score: number;
}
const leaderboardStyles = {
    container: {
      backgroundColor: '#f0f0f0',
      border: '2px solid #ddd',
      borderRadius: '10px',
      padding: '10px',
      marginTop: '20px',
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      margin: '10px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    name: {
      fontSize: '16px',
      color: '#333',
    },
    score: {
      fontSize: '18px',
      color: '#00f', // Blue color for scores
    },
  };
  
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
