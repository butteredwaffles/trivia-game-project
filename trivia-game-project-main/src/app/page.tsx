'use client'
import { useEffect, useState } from 'react';
import {Player} from './gametypes';
import { Question, getQuestions } from './components/questions';
import { Game, GameCompleted, Options, Startpage } from './components';


enum GameMode {
  OPTIONS,
  GAME,
  LEADERBOARD
}

const NUM_QUESTIONS = 1;

export default function Home() {
  const [mode, setMode] = useState<GameMode>(GameMode.OPTIONS);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [nextPage, setnextPage] = useState(false);

  function startGame(players: Player[], questions: Question[]) {
    setPlayers(players);
    setQuestions(questions);
    setMode(GameMode.GAME);
  }

  useEffect(() => {
      document.title = "Trivia Game";
  })

  function onGameCompleted(finishedPlayers: Player[]) {
    setPlayers(finishedPlayers);
    setMode(GameMode.LEADERBOARD);
  }

  function restartGame() {
    setMode(GameMode.OPTIONS)
  }

  function nextgamepage() {
    setnextPage(true);
  }

  switch (mode) {
    case GameMode.GAME:
      return loading ? (<p>Loading...</p>) : (<Game questions={questions} playerList={players} onGameCompleted={onGameCompleted}></Game>)
    case GameMode.LEADERBOARD:
      return <GameCompleted players={players} playAgain={restartGame}></GameCompleted>
    default:
      switch(nextPage){
        case true:
          return <Options onFormCompletion={startGame} populatedPlayers={players}></Options>
        case false:
          return <Startpage nextPageValue={nextgamepage}></Startpage>
    }
  }
}
