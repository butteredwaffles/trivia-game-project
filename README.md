# Trivia Game Project for CPSC 8710

This is a simple trivia game that can be played through a video / voice call with up to four people. You can enter in names of players at the start of the game, as well as choose
a category to play in. One player controls the game and is able to select a button to indicate which player answered the question. At the end of the game, a winner is shown!

## Getting started

Install the packages (`npm install`, `yarn add`, or `bun install`, depending on your preferred package manager).
Then run `npm run dev` and navigate to `http://localhost:3000` in your browser.

## Technologies Used

This project utilizes the Next.js framework to create a simple React app. TypeScript is also leveraged here!
The trivia questions are sourced from [OpenTDB](https://opentdb.com/), a sizable community database.

## Deployment

This project was deployed using Vercel (who are also the creators of Next.js). In order to deploy, I linked it to the GitHub repository and set a commit to deploy from.
This app is hosted [here](https://trivia-game-project-three.vercel.app/).

## Reflection

The initial idea was for a trivia game that could be controlled by one person but played by several people. The controller could share their screen in a video call, or they could recite the questions and answers verbally to the other players. They could choose how many rounds they wanted to play, and at the end, the game would display a leaderboard with the winner.

The first challenge was finding a source of trivia questions with a good amount of questions (so that replays would not re-use questions rapidly) while also allowing the player to choose the category and difficulty of the questions. Fortunately, the OpenTDB database was free and offered plenty of customization options.

The second challenge was learning how to use React. There were no front-end developers or UI designers on the team, so styling the application took plenty of work. Next.js was the framework used to serve the application and was very developer-friendly. Vercel was also easy to use and quickly deployed the site without friction.

There were also a few dilemmas with designing the game as well.

Initially, there was a fill-in-the-blank idea. However, with one person controlling the screen, relying on a single person to type the answers of up to four people (and depending on the question, a response could easily be several words) would not give others time to answer the question if they take more than a few seconds to come up with one. The person controlling the game must also focus on thinking of their answer as all this is happening. Because of these factors, the idea did not quite work out.

Most trivia games give more points to the player based on how quickly they answered the question with respect to the time remaining in the round. (Example: A correct answer with 56 seconds left gets 156 points, while a correct answer made with 40 seconds left gets 140 points.) However, since only one person controls the game for everyone, it would be impossible for two people who guessed at roughly the same time to get the same score because of the time taken for the controller to select the answers. The dynamic behind the "timer points" seemed worth preserving in some fashion, though, so the points awarded to the player in this game still increase depending on how quickly they answer compared to their friends. The first correct answer gets 400 points, the second correct answer gets 300 points, and so on. It is up to the controller to be honest about who answered first! 

The timer was another difficult decision to make. We do not want to make assumptions about the user's capabilities controlling the game and how quickly they can navigate around a screen to make the inputs, but we still want to have some kind of timer on a round. It settled on one minute, which should give everyone enough time to think and have their answer inputted. If everyone answers, the round ends early.

Ultimately, this was still a learning experience and something new for us all to try!