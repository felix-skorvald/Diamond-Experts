import { randomizeWord } from "./word-randomizer.js";
import { restartHangMan } from "./draw-hangman.js";

let buttonStart = document.querySelector(".button-start");
let allSections = document.querySelectorAll(".all-section");
let inputName = document.querySelector(".input-name");
let errorMessage = document.querySelector(".error-message");

const gameSection = document.querySelector(".game-section");
let wordInGame = "";

function hideAllSections() {
    allSections.forEach((section) => {
        if (!section.classList.contains("hidden")) {
            section.classList.add("hidden");
        }
    });
}

buttonStart.addEventListener("click", () => {
    if (inputName.value.trim() === "") {
        errorMessage.innerText = "Vi behöver att veta ditt namn!";
        return;
    }
    allSections.forEach((section, index) => {
        if (index === 1) {
            section.classList.remove("hidden");
        } else {
            section.classList.add("hidden");
        }
    });
});
let buttonBack = document.querySelector(".button-back");
buttonBack.addEventListener("click", () => {
    allSections.forEach((section, index) => {
        if (index === 0) {
            section.classList.remove("hidden");
        } else {
            section.classList.add("hidden");
        }
    });
    errorMessage.style.display = "none";
});

let easyButton = document.querySelector(".button-easy");
let mediumButton = document.querySelector(".button-medium");
let difficultButton = document.querySelector(".button-difficult");

easyButton.addEventListener("click", () => {
    wordInGame = randomizeWord(10, 13);
    startGame();
});
mediumButton.addEventListener("click", () => {
    wordInGame = randomizeWord(13, 15);
    startGame();
});
difficultButton.addEventListener("click", () => {
    wordInGame = randomizeWord(15, 17);
    startGame();
});

function startGame() {
    hideAllSections();
    gameSection.classList.remove("hidden");
    restartHangMan();
}
