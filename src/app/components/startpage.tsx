import { useState } from 'react';



type NextGamePage={
    nextPageValue:()=>void;
}


export function Startpage(props: NextGamePage){
    return (
        <>
            <div className="animate-wiggle delay-100 m-auto bg-stone-100 shadow-md shadow-inner w-4/6 p-10 flex items-center justify-center rounded-3xl mt-48">
                <p className="text-stone-600 text-3xl text-center">Welcome to Group Trivia!</p>
            </div>
            <button className='m-auto border-2 w-40 h-10 bg-stone-100 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-3xl shadow-xl' onClick={props.nextPageValue}>Start</button>
        </>
    )
}