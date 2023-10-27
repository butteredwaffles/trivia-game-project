import { useState } from 'react';



type NextGamePage={
    nextPageValue:()=>void;
}


export function Startpage(props: NextGamePage){
    return (
        <>
            <button className='m-auto border-2 w-40 h-10 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-3xl shadow-xl' onClick={props.nextPageValue}>Start</button>
        </>
    )
}