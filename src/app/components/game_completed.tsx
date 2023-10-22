import { Leaderboard } from "./leaderboard";
import {AnswerButton} from "./answerbutton";
import { Player } from "../gametypes";

type GameCompletionProps = {
    players: Player[],
    playAgain: () => void;
}

export function GameCompleted(props: GameCompletionProps) {

    return (
    <div className="h-screen">
         <div className="mt-10 animate-wiggle delay-100 m-auto bg-stone-100 border-stone-400 border-2 w-4/6 p-10 flex items-center justify-center rounded-3xl">
            <p className="text-stone-600 text-4xl text-center">All done!! Good game!</p>
        </div>
        <div className="mt-10 w-2/6 m-auto text-center">
            <Leaderboard playerList={props.players}></Leaderboard>
        </div>
        <div className="mt-10 w-2/6 m-auto text-center">
            <AnswerButton choice="Play again?" onChosen={props.playAgain}></AnswerButton>
        </div>
    </div>
    )
}