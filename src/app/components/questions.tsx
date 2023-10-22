'use client'
var he = require('he');

type Category = {
    name: string
    id: number
}

export async function getCategories() {
    let categories: Array<Category> = await fetch("https://opentdb.com/api_category.php").then((response) => response.json()).then((json) => json['trivia_categories']);
    return categories;
}

type QuestionConstructor = {
    category: string
    type: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answers: Array<string>
}

export class Question {
    category: string
    type: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answers: Array<string>
    combined_answers: Array<string>

    constructor(obj: QuestionConstructor) {
        this.category = obj.category;
        this.type = obj.type;
        this.difficulty = obj.difficulty;
        this.correct_answer = he.decode(obj.correct_answer);
        this.question = he.decode(obj.question);
        this.incorrect_answers = obj.incorrect_answers.map(a => he.decode(a));
        this.combined_answers = this.incorrect_answers.concat(this.correct_answer).map(a => he.decode(a)).sort();
    }
}


export async function getQuestions(quantity: number = 10, type: string = "multiple", difficulty: string = "easy", category: number = -1): Promise<Question[]> {
    let questions: Array<Question> = [];
    let cat = category == -1 ? "" : `category={category}`;
    let resp = await fetch(`https://opentdb.com/api.php?amount=${quantity}&difficulty=${difficulty}&type=${type}&${cat}`);
    let json = await resp.json();
    questions = json["results"].map((r: QuestionConstructor) => new Question(r));

    return questions;
}