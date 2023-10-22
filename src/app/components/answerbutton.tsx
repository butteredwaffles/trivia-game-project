export function AnswerButton({choice, onChosen}) {
    return (
        <button className="bg-stone-100 border-stone-400 border-2 m-5 rounded-3xl transition hover:scale-110 duration-300" onClick={() => onChosen(choice)}>
            <p className="text-stone-600 text-3xl p-5 text-center m-auto" >{choice}</p>
        </button>
    )
}
