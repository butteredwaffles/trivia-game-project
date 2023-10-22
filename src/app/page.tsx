'use client'
import { useEffect, useState } from 'react';
import {Player} from './gametypes';
import { Question, getQuestions } from './components/questions';
import { Game, GameCompleted } from './components';

enum GameMode {
  OPTIONS,
  GAME,
  LEADERBOARD
}

const NUM_QUESTIONS = 1;

export default function Home() {
  const [mode, setMode] = useState<GameMode>(GameMode.GAME);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<Player[]>([
    {name: "Julie", score: 0, answeredThisRound: false},
    {name: "Max", score: 0, answeredThisRound: false},
    {name: "Frank", score: 0, answeredThisRound: false}
]);

  useEffect(() => {

      async function fetchData() {
          let raw = await getQuestions(NUM_QUESTIONS, "multiple");
          setQuestions(raw);
          setLoading(false);
      }
      document.title = "Trivia Game";
      fetchData();
  }, [])

  function onGameCompleted(finishedPlayers: Player[]) {
    setPlayers(finishedPlayers);
    setMode(GameMode.LEADERBOARD);
  }

  switch (mode) {
    case GameMode.GAME:
      return loading ? (<p>Loading...</p>) : (<Game questions={questions} playerList={players} onGameCompleted={onGameCompleted}></Game>)
    case GameMode.LEADERBOARD:
      return <GameCompleted players={players}></GameCompleted>
    default:
      return <p>options screen placeholder</p>
  }
}
