// import { words } from './svenska-ord'

const displaySection = document.querySelector('.mystery-word');
const userInput = document.querySelector('.user-input');
const resultScreen = document.querySelector('.result-screen');
const highestScores = document.querySelector('.highest-scores');

let testWord = 'frontend';
let guessedLetters = [];
let wrongGuesses = [];
let maxAttempts = 6;
let gameBoard = Array(testWord.length).fill('_');
let score = 0;
let gameOver = false;
let userName = 'Player 1';
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

export const handleGuess = (pressedLetter, word) => {
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
        score++;
        gameOver = true;
        saveScores({
            word: testWord,
            user: userName,
            score: score,
            date: new Date().toString(),
        });

        console.log('High Scores:', highScores());
        // We can add do you want to play again and play again button here
    } else if (wrongGuesses.length >= maxAttempts) {
        resultScreen.innerHTML = `Game Over! The word was "${word}".`;
        gameOver = true;
        saveScores({
            word: testWord,
            user: userName,
            score: score,
            date: new Date().toString(),
        });

        // We can add do you want to play again and play again button here
    }

    displayInitialBoard();
};

handleGuess();

export function resetGame() {
    guessedLetters = [];
    wrongGuesses = [];
    maxAttempts = 6;
    gameBoard = Array(testWord.length).fill('_');
    gameOver = false;
    displayInitialBoard();
    userInput.innerHTML = '';
    resultScreen.innerHTML = '';
    console.log('Game reset');
}

resetGame();

// saving scores to the local storage starts here

export function saveScores(newScore) {
    let getScores = highScores();
    getScores.push(newScore);

    // Sort  score -highest to lowest within the top 5 scores
    getScores.sort((a, b) => b.score - a.score);

    // Save top 5 scores will be displayed
    // We can show more or less scores
    getScores = getScores.slice(0, 5);

    localStorage.setItem(KEY, JSON.stringify(getScores));
    console.log('Scores saved:', getScores);
}

export function highScores() {
    const json = localStorage.getItem(KEY);
    return json ? JSON.parse(json) : [];
}

// display function
