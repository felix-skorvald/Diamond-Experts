// import { words } from './svenska-ord';
const displaySection = document.querySelector('.mystery-word');
const userInput = document.querySelector('.user-input');
const resultScreen = document.querySelector('.result-screen');

let testWord = 'frontend';
let guessedLetters = [];
let wrongGuesses = [];
let maxAttempts = 6;
let gameBoard = Array(testWord.length).fill('_');
let score = 0;
let gameOver = false;

const KEY = 'scores';

function displayInitialBoard() {
    displaySection.innerHTML = gameBoard.join(' ');
}
displayInitialBoard();

document.addEventListener('keydown', (event) => {
    // If conditional down below is the game is over check code,
    // if the gameOver is true then ignore further input but keep the event listener
    if (gameOver) {
        userInput.innerHTML = 'Game is over. Press restart to play again.';
        console.log('Game is over. No more input allowed.');
        return;
    }

    const pressedLetter = event.key.toLowerCase();
    const alphabet = /^[a-zåäö]$/;

    if (alphabet.test(pressedLetter)) {
        console.log(`The ${pressedLetter} key was pressed.`);
        userInput.innerHTML = `The ${pressedLetter} key was pressed.`;
        handleGuess(pressedLetter, testWord);
    } else {
        console.log('Invalid input. Please press a valid letter.');
        userInput.innerHTML = `Invalid input. Please press a valid letter.`;
    }
    console.log('Raw key input:', event.key);
    console.log(guessedLetters);
});

const handleGuess = (pressedLetter, word) => {
    pressedLetter = pressedLetter.toLowerCase();
    if (
        guessedLetters.includes(pressedLetter) ||
        wrongGuesses.includes(pressedLetter)
    ) {
        userInput.innerHTML = `Letter "${pressedLetter}" has already been guessed.`;
        return;
    }

    guessedLetters.push(pressedLetter);

    if (word.includes(pressedLetter)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === pressedLetter) {
                gameBoard[i] = pressedLetter;
            }
        }
        console.log(`Correct guess! Current board: ${gameBoard.join('   ')}`);
        userInput.innerHTML = `Correct guess! Current board: ${gameBoard.join(
            ' '
        )}`;
    } else {
        wrongGuesses.push(pressedLetter);
        console.log(
            `Wrong guess! Remaining attempts: ${
                maxAttempts - wrongGuesses.length
            }`
        );
        userInput.innerHTML = `Wrong guess! Remaining attempts: ${
            maxAttempts - wrongGuesses.length
        }`;
    }

    displayInitialBoard();

    //Here is the code for deciding winning or losing condition.
    if (!gameBoard.includes('_')) {
        resultScreen.innerHTML = 'You win!';
        gameOver = true;
        // We can add do you want to play again and play again button here
    } else if (wrongGuesses.length >= maxAttempts) {
        resultScreen.innerHTML = `Game Over! The word was "${word}".`;
        gameOver = true;
        // We can add do you want to play again and play again button here
    }
};

handleGuess();

// function highScores() {
//     let json = localStorage.getItem(KEY);
//     let scores = JSON.parse(json);
//     console.log('Highest scores', scores);
//     return scores;
// }

// function saveScores(scores) {}
