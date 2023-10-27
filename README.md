# Trivia Game Project for CPSC 8710

Welcome to the Trivia Game Project, a fun and interactive game that can be played with up to four players. This game is designed to be played over video or voice calls, making it a great choice for virtual gatherings. In this game, players can enter their names at the start and choose a category to play in. One player takes control of the game and can select a button to indicate which player answered the question. At the end of the game, a winner is determined and displayed.

## Game Objective and Rules

The objective of the game is to answer trivia questions and earn points. Here are the basic rules:

- Players can enter their names and choose a category at the start of the game.
- One player takes control of the game and can start rounds.
- The controller can share their screen or read out questions to other players.
- Players should answer questions as quickly as possible to earn more points.
- The first correct answer earns 500 points, the second correct answer earns 400 points, and so on.
- A timer is set for one minute for each round, allowing all players to answer within the time limit.
- At the end of the game, a leaderboard displays the winner based on points earned.

## Technologies Used

This project is built using the following technologies:

- Next.js: Next.js is the framework used to create a simple React app for this project. `create-next-app` was used to bootstrap it.
- TypeScript: TypeScript is leveraged to ensure type safety and maintainable code.
- Trivia Questions: The trivia questions used in the game are sourced from [OpenTDB](https://opentdb.com/), a community database with a wide range of questions.

## Setup

To get started with the Trivia Game, follow these steps:

Install the packages (`npm install`, `yarn add`, or `bun install`, depending on your preferred package manager).
Then run `npm run dev` and navigate to `http://localhost:3000` in your browser.

## Deployment

This project was deployed using Vercel (who are also the creators of Next.js). In order to deploy, I linked it to the GitHub repository and set a commit to deploy from.
This app is hosted and you can play it [here](https://trivia-game-project-three.vercel.app/).

## Contributions

We would like to acknowledge the contributions of the following team members:

- **Janet Taylor** contributed to the game's design, built/deployed the app, and integrated it with the OpenTDB API.
- **Yaswanth Mulakala** designed the first landing page, worked on the functionality of UI components and the documentation.
- **Jaipal** worked on the leaderboard feature.

## Screenshots

Here are some screenshots of the game in action:

![image](https://github.com/butteredwaffles/trivia-game-project/assets/128730384/f7afa940-1eff-4b59-85ab-7dd55a877221)

![image](https://github.com/butteredwaffles/trivia-game-project/assets/128730384/392076dc-8ccb-414c-8372-c647da03a8b9)

![image](https://github.com/butteredwaffles/trivia-game-project/assets/128730384/2accf13b-8aca-40de-93d7-a872a8749725)

![image](https://github.com/butteredwaffles/trivia-game-project/assets/128730384/e0d5b964-512c-47e4-813e-e2b040d798e4)

![image](https://github.com/butteredwaffles/trivia-game-project/assets/128730384/aa133485-bb83-4559-98b9-48b53ce34635)

![image](https://github.com/butteredwaffles/trivia-game-project/assets/128730384/8a4ebb9b-50b9-4d32-a783-82f4c976144c)

![image](https://github.com/butteredwaffles/trivia-game-project/assets/128730384/a4842de7-1f49-41e6-8b04-984847af9822)


## Reflection

The initial idea was for a trivia game that could be controlled by one person but played by several people. The controller could share their screen in a video call, or they could recite the questions and answers verbally to the other players. They could choose how many rounds they wanted to play, and at the end, the game would display a leaderboard with the winner.

The first challenge was finding a source of trivia questions with a good amount of questions (so that replays would not re-use questions rapidly) while also allowing the player to choose the category and difficulty of the questions. Fortunately, the OpenTDB database was free and offered plenty of customization options.

The second challenge was learning how to use React. There were no front-end developers or UI designers on the team, so styling the application took plenty of work. Next.js was the framework used to serve the application and was very developer-friendly. Vercel was also easy to use and quickly deployed the site without friction.

There were also a few dilemmas with designing the game as well.

Initially, there was a fill-in-the-blank idea. However, with one person controlling the screen, relying on a single person to type the answers of up to four people (and depending on the question, a response could easily be several words) would not give others time to answer the question if they take more than a few seconds to come up with one. The person controlling the game must also focus on thinking of their answer as all this is happening. Because of these factors, the idea did not quite work out.

Most trivia games give more points to the player based on how quickly they answered the question with respect to the time remaining in the round. (Example: A correct answer with 56 seconds left gets 156 points, while a correct answer made with 40 seconds left gets 140 points.) However, since only one person controls the game for everyone, it would be impossible for two people who guessed at roughly the same time to get the same score because of the time taken for the controller to select the answers. The dynamic behind the "timer points" seemed worth preserving in some fashion, though, so the points awarded to the player in this game still increase depending on how quickly they answer compared to their friends. The first correct answer gets 500 points, the second correct answer gets 400 points, and so on. It is up to the controller to be honest about who answered first!

The timer was another difficult decision to make. We do not want to make assumptions about the user's capabilities controlling the game and how quickly they can navigate around a screen to make the inputs, but we still want to have some kind of timer on a round. It settled on one minute, which should give everyone enough time to think and have their answer inputted. If everyone answers, the round ends early.

Ultimately, this was still a learning experience and something new for us all to try!

