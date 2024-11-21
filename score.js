// import { words } from './svenska-ord';
const keyboardSection = document.querySelector('.keyboard');
const userInput = document.querySelector('.user-input');

let testWord = 'frontend';
let guessedLetters = [];
let wrongGuesses = [];
let maxAttempts = 6;
let gameBoard = Array(testWord.length).fill('_');

const KEY = 'scores';

document.addEventListener('keydown', (event) => {
    const pressedLetter = event.key.toLowerCase();
    const alphabet = /^[a-zåäö]$/;

    if (alphabet.test(pressedLetter)) {
        console.log(`The ${pressedLetter} key was pressed.`);
        userInput.innerHTML = `The ${pressedLetter} key was pressed.`;
    } else {
        console.log('Invalid input. Please press a valid letter.');
        userInput.innerHTML = `Invalid input. Please press a valid letter.`;
    }
    console.log('Raw key input:', event.key);
});

// const handleGuess = (pressedLetter, word){
//     letter = letter.toLowerCase();
// };

// function highScores() {
//     let json = localStorage.getItem(KEY);
//     let scores = JSON.parse(json);
//     console.log('Highest scores', scores);
//     return scores;
// }

// function saveScores(scores) {}
