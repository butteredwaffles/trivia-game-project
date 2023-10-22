'use client'
import React, { useState, useEffect } from 'react';
import { Player } from "../gametypes";

const leaderboardStyles = {
    container: {
      backgroundColor: '#f0f0f0',
      border: '2px solid #ddd',
      borderRadius: '10px',
      padding: '10px',
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
  
type LeaderboardProps = {
  playerList: Player[]
}

export function Leaderboard(props: LeaderboardProps) {
  const highestScore = Math.max(...props.playerList.map(p => p.score));

  useEffect(() => {
    // Fetch leaderboard data from your JSON file or an API
      //fetch('/src/app/Leaderboard/Leader.json')
      //.then((response) => response.json())
      //.then((data) => setLeaderboardData(data))
      //.catch((error) => console.error('Error fetching leaderboard data:', error))
  }, []);

  return (
    <div style={leaderboardStyles.container}>
      <h2 style={leaderboardStyles.title}>Leaderboard</h2>
      <ul style={leaderboardStyles.list}>
        {props.playerList.map((entry, index) => (
          <li key={index} style={leaderboardStyles.listItem}>
            {entry.score === highestScore ? "👑" : " "} {entry.name}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};