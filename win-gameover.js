import { sendName } from "./script-section12.js";

const gameOverTitle = document.querySelector("#gameover-title");
const winTitle = document.querySelector("#win-title")


gameOverTitle.innerText=sendName()
winTitle.innerText=`GRATTIS ${sendName()}!😊`