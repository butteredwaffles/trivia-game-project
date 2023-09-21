'use client'
import { useState } from 'react';
import Modal from 'react-modal';
import Countdown from 'react-countdown';

export function Question({text}) {
    return (
        <div className="animate-wiggle delay-100 m-auto bg-stone-100 border-stone-400 border-2 w-4/6 p-10 flex items-center justify-center rounded-3xl">
            <p className="text-stone-600 text-3xl text-center">{text}</p>
        </div>
    )
}

export function Answer({choice, onChosen}) {
    return (
        <button className="bg-stone-100 border-stone-400 border-2 m-5 rounded-3xl transition hover:scale-110 duration-300" onClick={() => onChosen(choice)}>
            <p className="text-stone-600 text-3xl p-5 text-center m-auto" >{choice}</p>
        </button>
    )
}

export default function Game() {
    const [choices, setChoices] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false);
    const players = ['Julie', 'John', 'Mary'];

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }
    function onChosen(choice: string) {
        openModal();
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
        <main className="flex h-screen flex-col items-center">
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Player"
            >
                {players.map(function(object, i){
                    return <><input type='radio' name='players' id={object} value={object} key={i} /> {object}<br></br></>;
                })}
            </Modal>
            <Question text="What year was the Declaration of Independence signed?"></Question>
            <div className="m-auto w-3/6">
                <div className='m-auto text-center'><Countdown className="text-3xl text-stone-600" date={Date.now() + 60000} key='countdown'></Countdown></div>
                
                <div className="grid grid-cols-2 grid-rows-2">
                    <Answer choice="1776" onChosen={onChosen}></Answer>
                    <Answer choice="1876" onChosen={onChosen}></Answer>
                    <Answer choice="1998" onChosen={onChosen}></Answer>
                    <Answer choice="2013" onChosen={onChosen}></Answer>
                </div>
            </div>
            
        </main>
    );
}