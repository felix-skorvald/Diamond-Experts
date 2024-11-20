// Hangman parts
const ground = document.querySelector("#ground");
const scaffold = document.querySelector("#scaffold");
const head = document.querySelector("#head");
const body = document.querySelector("#body");
const arms = document.querySelector("#arms");
const legs = document.querySelector("#legs");

// Temporary test button to alter between s
const testButton = document.querySelector("#test-button");

//state of drawing
let hangMan = 0;

function restartHangMan() {
    scaffold.style.display = "none";
    head.style.display = "none";
    body.style.display = "none";
    arms.style.display = "none";
    legs.style.display = "none";
}

testButton.addEventListener("click", () => {
    if (hangMan === 0) {
        restartHangMan();
        hangMan++;
    } else if (hangMan === 1) {
        scaffold.style.display = "";
        hangMan++;
    } else if (hangMan === 2) {
        head.style.display = "";
        hangMan++;
    } else if (hangMan === 3) {
        body.style.display = "";
        hangMan++;
    } else if (hangMan === 4) {
        arms.style.display = "";
        hangMan++;
    } else {
        legs.style.display = "";
        hangMan = 0;
        //GAME OVER
    }
});
