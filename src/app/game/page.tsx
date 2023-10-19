'use client'
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Countdown from 'react-countdown';
import { Question, getCategories, getQuestions } from './questions';

export type Player = {
    name: string,
    score: number,
    answeredThisRound: boolean;
}

function QuestionElement({text}) {
    return (
        <div className="animate-wiggle delay-100 m-auto bg-stone-100 border-stone-400 border-2 w-4/6 p-10 flex items-center justify-center rounded-3xl">
            <p className="text-stone-600 text-3xl text-center">{text}</p>
        </div>
    )
}

function Answer({choice, onChosen}) {
    return (
        <button className="bg-stone-100 border-stone-400 border-2 m-5 rounded-3xl transition hover:scale-110 duration-300" onClick={() => onChosen(choice)}>
            <p className="text-stone-600 text-3xl p-5 text-center m-auto" >{choice}</p>
        </button>
    )
}

function GameCompleted() {
    return <div className="flex h-screen flex-col items-center">
         <div className="animate-wiggle delay-100 m-auto bg-stone-100 border-stone-400 border-2 w-4/6 p-10 flex items-center justify-center rounded-3xl">
            <p className="text-stone-600 text-4xl text-center">All done!! Good game!</p>
        </div>
    </div>
}

function Game({questions}) {
    const [players, setPlayers] = useState<Array<Player>>([
        {name: "Julie", score: 0, answeredThisRound: false},
        {name: "Max", score: 0, answeredThisRound: false},
        {name: "Frank", score: 0, answeredThisRound: false}
    ]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [roundTimer, setRoundTimer] = useState(Date.now() + 60000);
    const [roundCompleted, setRoundCompleted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState();

    useEffect(() => {
        setCurrentQuestion(questions[0]);
    }, [])

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }
    function onChosen(choice: string) {
        if (!roundCompleted) {
            setSelectedAnswer(choice);
            openModal();
        }
    }

    function increaseScore(p_name: string) {
        let nextPlayers = players.map((p, i) => {
            if (p_name === p.name) {
                if (currentQuestion.correct_answer === selectedAnswer) p.score++;
                p.answeredThisRound = true;
            }
            
            return p;
        });
        setPlayers(nextPlayers);

        if (nextPlayers.find(p => p.answeredThisRound == false) === undefined) {
            // everyone has answered
            setRoundTimer(Date.now() + 1);
            setTimeout(resetRound, 5000);
        }
        closeModal();
    }

    function resetRound() {
        if (questionIndex + 1 !== questions.length) {
            console.log("Resetting round...")
            setQuestionIndex(questionIndex + 1);
            setCurrentQuestion(questions[questionIndex + 1]);
            setRoundTimer(Date.now() + 60000);
            setRoundCompleted(false);
        } else {
            setGameCompleted(true);
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
      
    function onComplete() {
        setTimeout(resetRound, 5000);
    }

    return gameCompleted ? <GameCompleted></GameCompleted> : (
        <div className="flex h-screen flex-col items-center">
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Player"
            >
               <div className="grid grid-cols-2 grid-rows-2">
                    {
                        players.map((p) => {
                            if (!p.answeredThisRound) return <Answer key={p.name} choice={p.name} onChosen={increaseScore}></Answer>
                        })
                    }
               </div>
            </Modal>
            <QuestionElement text={currentQuestion.question}></QuestionElement>
            <div className="m-auto w-3/6">
                <div className='m-auto text-center'><Countdown className="text-3xl text-stone-600" date={roundTimer} onComplete={onComplete} key={roundTimer}>
                     <p>The correct answer is <strong>{currentQuestion.correct_answer}</strong>!</p>
                </Countdown></div>
                
                <div className="grid grid-cols-2 grid-rows-2">
                    {
                        currentQuestion.combined_answers.map(a => <Answer key={a} choice={a} onChosen={onChosen}></Answer>)
                    }
                </div>
            </div>
        </div>
    );
}

export default function Wrapper() {
    const [questions, setQuestions] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            let raw = await getQuestions(10, "multiple");
            setQuestions(raw);
            setLoading(false);
        }

        fetchData();
    }, [])

    return (
        
           loading ? (<p>Loading...</p>) : (<Game questions={questions}></Game>)
        
    )
}