'use client'
import { useEffect, useState } from 'react';
import { Question, Category, getCategories, getQuestions } from './questions';
import { Player } from "../gametypes";

type OptionsProps = {
    onFormCompletion: (players: Player[], questions: Question[]) => void
    populatedPlayers: Player[]
}

export function Options(props: OptionsProps) {
    const [formValues, setFormValues] = useState({
        playerOne: props.populatedPlayers?.[0]?.name || '',
        playerTwo: props.populatedPlayers?.[1]?.name || '',
        playerThree: props.populatedPlayers?.[2]?.name || '',
        playerFour: props.populatedPlayers?.[3]?.name || '',
        numQuestions: "10",
        category: "-1"
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [errors, setErrors] = useState({
        noPlayers: false
    });

    useEffect(() => {
        async function fetchData() {
            let res = await getCategories();
            setCategories(res);
        }
        fetchData();
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;
        if ((typeof value) === "string") {
            value = value.trim()
        }
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors({noPlayers: false});
    };

    const validate = () => {
        let isValid = true;
        const newErrors = { noPlayers: false };

        if (!formValues.playerOne && !formValues.playerTwo && !formValues.playerThree && !formValues.playerFour) {
            isValid = false;
            newErrors.noPlayers = true;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formValues);
        if (validate()) {
            let players: Player[] = [];
            for (let value of [formValues.playerOne, formValues.playerTwo, formValues.playerThree, formValues.playerFour]) {
                if (value !== "") {
                    players.push({name: value, score: 0, answeredThisRound: false});
                }
            }
            getQuestions(parseInt(formValues.numQuestions), "multiple", "easy", parseInt(formValues.category)).then((questions) => props.onFormCompletion(players, questions));
        }
    };

    const inputClasses = "block mt-1 w-full h-8 rounded-md px-2 shadow-md";

    return (
        <div className="flex h-screen flex-col items-center w-screen">
            <div className="animate-wiggle delay-100 m-auto bg-stone-100 shadow-md shadow-inner w-4/6 p-10 flex items-center justify-center rounded-3xl">
            <p className="text-stone-600 text-3xl text-center">Game Options</p>
            </div>
            <form id="optionsForm" onSubmit={handleSubmit} className="m-auto bg-stone-100 border-stone-400  p-10 rounded-3xl shadow-xl">
                <div className="mb-10">
                    <p className="text-xl mb-5">Enter players:</p>
                    <input name="playerOne" id="playerOne" placeholder="Enter player one's name" className={inputClasses} type="text" value={formValues.playerOne} onChange={handleChange} />
                    <input name="playerTwo" id="playerTwo" placeholder="Enter player two's name" className={inputClasses} type="text" value={formValues.playerTwo} onChange={handleChange} />
                    <input name="playerThree" id="playerThree" placeholder="Enter player three's name" className={inputClasses} type="text" value={formValues.playerThree} onChange={handleChange} />
                    <input name="playerFour" id="playerFour" placeholder="Enter player four's name" className={inputClasses} type="text" value={formValues.playerFour} onChange={handleChange} />
                    {errors.noPlayers && <p className="">You must enter in at least one player name.</p>}
                </div>
                
                <p className="text-xl mb-2">Enter number of questions:</p>
                <input name="numQuestions" id="numQuestions" placeholder="Enter amount of questions" step="1" min="1" max="60" className={inputClasses} type="number" inputMode="numeric" value={formValues.numQuestions} onChange={handleChange} />
                <p className="text-xl mb-2">Choose a category:</p>
                <select
                    name="category"
                    id="category"
                    className='scrollbar h-8' 
                    value={formValues.category}
                    onChange={handleChange}>
                    {categories.map((category: Category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                    <option key="-1" value="-1">All Categories</option>
                </select>
                <button
                        className="mt-4 m-auto flex items-center outline-none rounded-md py-[1px] pl-2 pr-3 bg-[#9eb785] hover:bg-[#88a06d] transition-colors duration-300 text-white"
                        type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            viewBox="0 -960 960 960"
                            width="20"
                            fill="#FFFFFF">
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                        </svg>
                        <span>Play</span>
                    </button>
            </form>
        </div>
    );
}