'use client'

export type Question = {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: Array<string>
}

export type Category = {
    id: number,
    name: string
}

export async function getCategories() {
    let categories: Array<Category> = await fetch("https://opentdb.com/api_category.php").then((response) => response.json()).then((json) => json['trivia_categories']);
    return categories;
}


export async function getQuestions(quantity: number = 10, type: string = "multiple", difficulty: string = "easy", category: number = -1) {
    let questions: Array<Question> = [];
    let cat = category == -1 ? "" : `category={category}`;
    console.log(`https://opentdb.com/api.php?amount=${quantity}&difficulty=${difficulty}&type=${type}&${cat}`);
    questions = await fetch(`https://opentdb.com/api.php?amount=${quantity}&difficulty=${difficulty}&type=${type}&${cat}`).then((response) => response.json()).then((data) => data['results']);
    return questions;
}