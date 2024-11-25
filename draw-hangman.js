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

// Will rewrite this to fit with gamemechanics. Pair with Betuls code.

testButton.addEventListener("click", () => {
    if (hangMan === 0) {
        scaffold.style.display = "";
        hangMan++;
    } else if (hangMan === 1) {
        head.style.display = "";
        hangMan++;
    } else if (hangMan === 2) {
        body.style.display = "";
        hangMan++;
    } else if (hangMan === 3) {
        arms.style.display = "";
        hangMan++;
    } else if (hangMan === 4) {
        legs.style.display = "";
        hangMan++;
    } else {
        hangMan = 0;
        //GAME OVER function
        restartHangMan();
    }
});

export { restartHangMan };
