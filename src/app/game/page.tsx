'use client'
import { useEffect, useState } from 'react';
import {useAsync} from 'react-async';
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

function Game({questions}) {
    const [players, setPlayers] = useState<Array<Player>>([
        {name: "Julie", score: 0, answeredThisRound: false},
        {name: "Max", score: 0, answeredThisRound: false},
        {name: "Frank", score: 0, answeredThisRound: false}
    ]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]);
    const [selectedAnswer, setSelectedAnswer] = useState();

    useEffect(() => {
        setCurrentQuestion(questions[0]);
    }, [questions])

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }
    function onChosen(choice: string) {
        setSelectedAnswer(choice);
        openModal();
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
        console.log(selectedAnswer);
        console.log(currentQuestion.correct_answer);
        console.log(nextPlayers);
        closeModal();
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

    return (
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
                <div className='m-auto text-center'><Countdown className="text-3xl text-stone-600" date={Date.now() + 60000} key='countdown'></Countdown></div>
                
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