import { randomizeWord } from "./word-randomizer.js";

let buttonStart = document.querySelector(".button-start");
let allSections = document.querySelectorAll(".all-section");
let inputName = document.querySelector(".input-name");
let errorMessage = document.querySelector(".error-message");

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
let buttonBack=document.querySelector(".button-back")
buttonBack.addEventListener("click",()=>{
	allSections.forEach((section,index)=>{
		if(index===0){
			section.classList.remove("hidden");
		}else{
			section.classList.add("hidden");
		}
	})
	errorMessage.style.display="none";
})

let easyButton=document.querySelector(".button-easy");
let mediumButton=document.querySelector(".button-medium");
let difficultButton=document.querySelector(".button-difficult");


easyButton.addEventListener("click",()=>{
	let randomEasy=randomizeWord(10,13);
	// console.log(randomEasy);
	return randomEasy;
})
mediumButton.addEventListener("click",()=>{
	let randomMedium=randomizeWord(13,15);
	// console.log(randomMedium);
	return randomMedium;
})
difficultButton.addEventListener("click",()=>{
	let randomDifficult=randomizeWord(15,17);
	// console.log(randomDifficult);
	return randomDifficult;
})

