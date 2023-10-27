'use client'
import { useEffect, useState, useReducer } from 'react';
import Modal from 'react-modal';
import Countdown from 'react-countdown';
import { Question } from './questions';
import { AnswerButton } from "./answerbutton";
import { Player } from "../gametypes";

type QuestionProps = {
    text: string
}

type GameProps = {
    questions: Question[];
    playerList: Player[];
    onGameCompleted: (players: Player[]) => void;
}

function QuestionElement(props: QuestionProps) {
    return (
        <div className="animate-wiggle delay-100 m-auto bg-stone-100 shadow-md shadow-inner w-4/6 p-10 flex items-center justify-center rounded-3xl">
            <p className="text-stone-600 text-3xl text-center">{props.text}</p>
        </div>
    )
}


export function Game(props: GameProps) {
    const [players, setPlayers] = useState<Array<Player>>(props.playerList);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [roundTimer, setRoundTimer] = useState(Date.now() + 60000);
    const [roundCompleted, setRoundCompleted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<Question>(props.questions[0]);
    const [selectedAnswer, setSelectedAnswer] = useState<string>();
    const [multiplier, setMultiplier] = useState<number>(500);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

    // Called when an answer is chosen, before a player is selected
    function onChosen(choice: string) {
        if (!roundCompleted) {
            setSelectedAnswer(choice);
            openModal();
        }
    }

    // Called when a player is selected
    function increaseScore(p_name: string) {
        let nextPlayers = players.map((p) => {
            if (p_name === p.name) {
                if (currentQuestion.correct_answer === selectedAnswer) {
                    p.score += multiplier;
                    p.wasCorrect = true;
                } else {
                    p.wasCorrect = false;
                }
                p.answeredThisRound = true;
                setMultiplier(multiplier - 100);
            }
            
            return p;
        });
        setPlayers(nextPlayers);

        if (nextPlayers.find(p => p.answeredThisRound == false) === undefined) {
            // everyone has answered
            setRoundTimer(Date.now() + 1);
            setRoundCompleted(true);
            setTimeout(resetRound, 5000);
        }
        closeModal();
    }

    // Called to progress to the next question OR end the game
    function resetRound() {
        if (questionIndex + 1 !== props.questions.length) {
            console.log("Resetting round...")
            setMultiplier(500);
            setQuestionIndex(questionIndex + 1);
            setCurrentQuestion(props.questions[questionIndex + 1]);
            setRoundTimer(Date.now() + 60000);
            setRoundCompleted(false);
            let nextPlayers = players.map((p, i) => {
                p.answeredThisRound = false;
                p.wasCorrect = false;
                return p;
            });
            setPlayers(nextPlayers);
        } else {
            props.onGameCompleted(players);
        }
        
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
    
      // Called when the timer ends
    function onComplete() {
        closeModal();
        setTimeout(resetRound, 5000);
    }

    return <div className="flex h-screen flex-col items-center">
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Player"
            >
                <p className="text-3xl text-center">Who&#39;s answering?</p>
                <hr />
               <div className="grid grid-cols-2 grid-rows-2">
                    {
                        players.map((p) => {
                            if (!p.answeredThisRound) return <AnswerButton key={p.name} choice={p.name} onChosen={increaseScore}></AnswerButton>
                        })
                    }
               </div>
            </Modal>
            <QuestionElement text={currentQuestion.question}></QuestionElement>
            <div className="m-auto w-3/6">
                <div className='m-auto text-center'><Countdown className="text-3xl text-stone-600" date={roundTimer} onComplete={onComplete} key={roundTimer}>
                     <p>The correct answer is <strong>{currentQuestion.correct_answer}</strong>! {
                        players.filter((p) => p.wasCorrect).length === 0 ? 
                            <span className="text-red-900">No one got points :&#40;</span> : 
                            <span className="text-green-400">Points for {players.filter(p => p.wasCorrect).map((p) => p.name).join(', ')}!</span>
                     }</p>
                </Countdown></div>
                
                <div className="grid grid-cols-2 grid-rows-2">
                    {
                        currentQuestion.combined_answers.map(a => <AnswerButton key={a} choice={a} onChosen={onChosen}></AnswerButton>)
                    }
                </div>
            </div>
        </div>
}