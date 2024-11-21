// import { words } from './svenska-ord';
const keyboardSection = document.querySelector('.keyboard');
const userInput = document.querySelector('.user-input');

let testWord = 'frontend';
let guessedLetters = [];
let wrongGuesses = [];
let maxAttempts = 6;
let gameBoard = Array(testWord.length).fill('_');
let score = 0;

const KEY = 'scores';

keyboardSection.innerHTML = gameBoard;

document.addEventListener('keydown', (event) => {
    const pressedLetter = event.key.toLowerCase();
    const alphabet = /^[a-zåäö]$/;

    if (alphabet.test(pressedLetter)) {
        console.log(`The ${pressedLetter} key was pressed.`);
        userInput.innerHTML = `The ${pressedLetter} key was pressed.`;
        guessedLetters.push(pressedLetter);
    } else {
        console.log('Invalid input. Please press a valid letter.');
        userInput.innerHTML = `Invalid input. Please press a valid letter.`;
    }
    console.log('Raw key input:', event.key);
    console.log(guessedLetters);
});

const handleGuess = (pressedLetter, testWord) => {
    pressedLetter = pressedLetter.toLowerCase();
    if (
        guessedLetters.includes(pressedLetter) ||
        wrongGuesses.includes(pressedLetter)
    ) {
        userInput.innerHTML = `Letter "${pressedLetter}" has already been guessed.`;
    }

    if (testWord.includes(pressedLetter)) {
        for (let i = 0; i < testWord.length; i++) {
            if (testWord[i] === pressedLetter) {
                gameBoard[i] = pressedLetter;
            }
        }
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
