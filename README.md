# Pokemon Memory Game

The Pokemon Memory Game is a simple memory game developed using React and the [PokeAPI](https://pokeapi.co/). The game was initially created by GPT-4 and has been improved with a human touch. This app serves as a tech demo of GPT-4's capabilities and was created within 48h of the AI's release.

The developer spent around 30 minutes debugging an issue with the array creation, where double IDs made the game unplayable. This demonstrates the effectiveness and usefulness of AI in the development process, and the necessity of human intervention to refine and optimize the result. This also hopefully demonstrates a open-mind in embracing new technologies, and how using them could potentially mean working smarter.

Hosted on Netflify here: [Pokemon Memory Game](https://pokemon-memory-gpt4.netlify.app/).

## Overview

The game features a 4x5 grid of 20 tiles, each representing a unique Pokemon from the first generation. Each Pokemon has a pair, and the objective is to find all matching pairs within the given time limit of 120 seconds. The game starts once the user clicks a tile or presses the "Start the game" button.

## How to Play

1. Click on a tile to reveal the Pokemon hidden beneath.
2. Click on another tile to find the matching Pokemon.
3. If the second tile matches the first one, both tiles will remain revealed. Otherwise, they will be hidden again after a short delay.
4. Continue finding and matching pairs until all pairs have been matched or the time runs out.

## Implementation

The game makes use of React hooks to manage state and effects. It fetches data from the PokeAPI, selects 10 unique Pokemon randomly, then creates pairs of tiles for each. The tiles are then shuffled and displayed in a grid.

The game's timer starts once the user clicks a tile or the "Start the game" button. If the timer runs out before all pairs are matched, the game ends with a loss. If all pairs are matched before the timer runs out, the game ends with a win.

## Installation and Running

1. Have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed;
2. Clone the repository to your machine;
3. Navigate to the project folder and run `npm install` to install all required dependencies;
4. Run `npm start` to start the development server;
5. Open your browser and go to `http://localhost:3000` to play the game.