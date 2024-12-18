import { words } from "./svenska-ord.js";

//input two numbers which you want the wordlegth to be. Returns a word within the specified range.
//t.ex console.log(randomizeWord(17, 22));
export function randomizeWord(minLetters, maxLetters) {
    let i = Math.floor(Math.random() * words.length);
    let word = words[i];
    do {
        i++;
        if (i > words.length) {
            i = 0;
        }
        word = words[i];
    } while (word.length < minLetters || word.length > maxLetters);
    {
        return word;
    }
}
