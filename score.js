// import { words } from './svenska-ord'
import { restartHangMan, drawHangMan } from "./draw-hangman.js";
import { randomizeWord } from "./word-randomizer.js";
import { sendName } from "./script-section12.js";
const displaySection = document.querySelector(".mystery-word");
const userInput = document.querySelector(".user-input");
const resultScreen = document.querySelector(".result-screen");
const highestScores = document.querySelector(".highest-scores");
const restartBtn = document.querySelector(".restart");
let allSections = document.querySelectorAll(".all-section");
const gameSection = document.querySelector(".game-section");
const highScoresBtn = document.querySelectorAll(".high-score-button");
const playAgainBtn = document.querySelectorAll(".play-again");
const closeBtn = document.querySelector(".close");
const wrongLetterContainer = document.querySelector(".wrong-letters");
const gameOverSection = document.querySelector("#game-over-scene");
const winSection = document.querySelector("#win-scene");
const greetUserWin = document.querySelector("#greet-user-win");
const greetUserGameOVer = document.querySelector("#greet-user-go");
const wordOfGame = document.querySelector("#word-of-game");

let testWord = "";
let guessedLetters = [];
let wrongGuesses = [];
let maxAttempts = 5;
let score = 0;
let gameOver = false;
let userName = "Player 1";
let gameBoard = [];
const KEY = "scores";
let easyButton = document.querySelector(".button-easy");
let mediumButton = document.querySelector(".button-medium");
let difficultButton = document.querySelector(".button-difficult");

function showWelcomeWithLevel(level, playerName) {
    const welcomeSection = document.getElementById("welcome-section");
    const welcomeMessageElement = document.getElementById("welcome-message");
    welcomeSection.classList.remove("hidden");
    // Update the welcome message text
    welcomeMessageElement.innerHTML = `Välkommen, ${playerName}! Du valde nivå: ${level}.`;

    // Style adjustments (optional)
    welcomeMessageElement.style.fontSize = "1.5rem";
    welcomeMessageElement.style.marginTop = "20px";
}

easyButton.addEventListener("click", () => {
    testWord = randomizeWord(10, 13);
    showWelcomeWithLevel("Lätt", sendName());
    startGame();
});
mediumButton.addEventListener("click", () => {
    testWord = randomizeWord(13, 15);
    showWelcomeWithLevel("Medel", sendName());
    startGame();
});
difficultButton.addEventListener("click", () => {
    testWord = randomizeWord(15, 17);
    showWelcomeWithLevel("Svår", sendName());
    startGame();
});

function hideAllSections() {
    allSections.forEach((section) => {
        if (!section.classList.contains("hidden")) {
            section.classList.add("hidden");
        }
    });
}

function startGame() {
    userName = sendName();
    gameBoard = Array(testWord.length).fill("_");
    console.log(userName);
    console.log(testWord);
    hideAllSections();
    gameSection.classList.remove("hidden");
    restartHangMan();
    function displayInitialBoard() {
        displaySection.innerHTML = gameBoard.join(" ");
    }
    displayInitialBoard();

    document.addEventListener("keydown", (event) => {
        // If conditional down below is the game is over check code,
        // if the gameOver is true then ignore further input but keep the event listener
        if (gameOver) {
            userInput.innerHTML = "Game is over. Press restart to play again.";
            console.log("Game is over. No more input allowed.");
            return;
        }

        const pressedLetter = event.key.toLowerCase();
        const alphabet = /^[a-zåäö]$/;

        if (alphabet.test(pressedLetter)) {
            console.log(`The ${pressedLetter} key was pressed.`);
            userInput.innerHTML = `The ${pressedLetter} key was pressed.`;
            handleGuess(pressedLetter, testWord);
        } else {
            console.log("Invalid input. Please press a valid letter.");
            userInput.innerHTML = `Invalid input. Please press a valid letter.`;
        }
        console.log("Raw key input:", event.key);
        console.log(guessedLetters);
    });

    const handleGuess = (pressedLetter, word) => {
        pressedLetter = pressedLetter.toLowerCase();
        if (
            guessedLetters.includes(pressedLetter) ||
            wrongGuesses.includes(pressedLetter)
        ) {
            userInput.innerHTML = `Du har redan gissat på bokstaven: "${pressedLetter}"`;
            return;
        }

        guessedLetters.push(pressedLetter);

        if (word.includes(pressedLetter)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === pressedLetter) {
                    gameBoard[i] = pressedLetter;
                }
            }
            console.log(
                `Correct guess! Current board: ${gameBoard.join("   ")}`
            );
            userInput.innerHTML = "Rätt bokstav!";
        } else {
            drawHangMan(wrongGuesses.length);
            wrongGuesses.push(pressedLetter);
            console.log(
                `Wrong guess! Remaining attempts: ${
                    maxAttempts - wrongGuesses.length
                }`
            );
            userInput.innerHTML = `Fel! återstående försök: ${
                maxAttempts - wrongGuesses.length
            }`;
            wrongLetterContainer.innerHTML = "";
            wrongLetterContainer.innerText = String(wrongGuesses).toUpperCase();
        }

        displayInitialBoard();

        //Here is the code for deciding winning or losing condition.
        if (!gameBoard.includes("_")) {
            resultScreen.innerHTML = "You win!";
            score++;
            win();
            gameOver = true;
            saveScores({
                word: testWord,
                user: userName,
                score: score,
                date: new Date().toString(),
            });

            console.log("High Scores:", highScores());
            // We can add do you want to play again and play again button here
        } else if (wrongGuesses.length >= maxAttempts) {
            resultScreen.innerHTML = `Game Over! The word was "${word}".`;
            gameOver = true;
            gameIsOver();
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

    // saving scores to the local storage starts here

    saveScores({
        word: testWord,
        user: userName,
        score: score,
        date: new Date().toString(),
    });

    console.log("LocalStorage after save:", localStorage.getItem(KEY));
    
}

function highScores() {
    const json = localStorage.getItem(KEY);
    return json ? JSON.parse(json) : [];
}

function saveScores(newScore) {
    let getScores = highScores();
    getScores.push(newScore);

    // Sort  score -highest to lowest within the top 5 scores
    getScores.sort((a, b) => b.score - a.score);

    // Save top 5 scores will be displayed
    // We can show more or less scores
    getScores = getScores.slice(0, 5);

    localStorage.setItem(KEY, JSON.stringify(getScores));
    // console.log('Scores saved:', getScores);
    // let scoreList = getScores.forEach((score) => {
    //     const li = document.createElement('li');
    //     li.textContent = `${score.user}: ${score.score} - ${new Date(
    //         score.date
    //     ).toLocaleDateString()}`;
    //     highestScores.appendChild(li);
    // });
    return getScores;
}

function resetGame(section) {
    guessedLetters = [];
    wrongGuesses = [];
    maxAttempts = 5;
    gameOver = false;
    gameBoard=[]
    userName = "";
    testWord = "";
    console.log("HEJEJEJEJ")
    userInput.innerHTML = "";
    resultScreen.innerHTML = "";
    wrongLetterContainer.innerHTML = "";
    displaySection.innerHTML = "";


    hideAllSections();

    allSections[section].classList.remove("hidden");
}

playAgainBtn.forEach((button) => {
    button.addEventListener("click", () => {
        resetGame(1)
    });
});

// This is the button to show highest 5 scores if clicked.
highScoresBtn.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(
            saveScores({
                word: testWord,
                user: userName,
                score: score,
                date: new Date().toString(),
            })
        );
        const scores = highScores();
        // hideAllSections();
        // const gameSection = document.querySelector(".game-section");
        // gameSection.classList.remove("hidden");

        const highScoreSection = document.querySelector(".high-score");
        highScoreSection.classList.remove("hidden");

        highestScores.innerHTML = "";

        if (scores.length > 0) {
            scores.forEach((score) => {
                const li = document.createElement("li");
                li.textContent = `Namn:  ${score.user} -  Poäng: ${
                    score.score
                } -  Datum: ${new Date(score.date).toLocaleDateString()}`;
                highestScores.appendChild(li);
            });
        } else {
            const li = document.createElement("li");
            li.textContent = "No high scores yet!";
            highestScores.appendChild(li);
        }
    });
});

// play again button on high scores section
// when clicked this button takes user to levels section

// Close button on high scores section
closeBtn.addEventListener("click", () => {
    const highScoreSection = document.querySelector(".high-score");
    highScoreSection.classList.add("hidden");
    // const gameSection = document.querySelector(".game-section");
    // gameSection.classList.remove("hidden");
});

function win() {
    hideAllSections();
    winSection.classList.remove("hidden");
    greetUserWin.innerText = `GRATTIS ${userName}!😊`;
}

function gameIsOver() {
    hideAllSections();
    gameOverSection.classList.remove("hidden");
    wordOfGame.innerText = testWord;
    greetUserGameOVer.innerText = userName;
}
