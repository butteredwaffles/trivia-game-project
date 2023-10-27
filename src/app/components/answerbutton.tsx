type AnswerProps = {
    choice: string
    onChosen: (choice: string) => void
}

export function AnswerButton(props: AnswerProps) {
    return (
        <button className="bg-stone-100 border-stone-200 border-2 shadow-md shadow-inner m-5 rounded-3xl transition hover:scale-110 duration-300" onClick={() => props.onChosen(props.choice)}>
            <p className="text-stone-600 text-3xl p-5 text-center m-auto" >{props.choice}</p>
        </button>
    )
}
