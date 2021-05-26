import { merge, pipe, compose } from "ramda";

const timer = document.querySelector(".timer");
const counter = document.querySelector(".counter");
const startBtnText = document.querySelector(".start-btn__text");
const startBtn = document.querySelector(".start-btn");

let intervalId: number;

const SECONDS = 3;
const STUDY = 1;
const BREAK = 5;
const START = "start";
const STOP = "stop";

let state = {
	time: STUDY * SECONDS,
	break: BREAK * SECONDS,
	count: 0,
	mode: "timer",
	startTimer: false,
};

const toggleText = textContent => startBtnText?.textContent = textContent === START ? STOP : START;

const reset = () => {
	clearInterval(intervalId);
	updateState({time: STUDY * SECONDS });
	console.log(state.time)
	startBtnText?.textContent = 'reset'
}

const countDown = () => {
	const txt = startBtnText?.textContent
	if (txt === START) {
		intervalId = setInterval(() => {
			if (state.time <= 0) return reset();
			toggleText(txt)
			updateState({ time: state.time - 1, startTimer: true });
			console.log(state.time);
		}, 1000);
	} else {
		clearInterval(intervalId);
		console.log(state.time);
		toggleText(txt);
	}
}

startBtn?.addEventListener('click', countDown)

const getMinutes = time => Math.floor(time / 60) < 10 ? "0" + String(Math.floor(time / 60)) : Math.floor(time / 60);
const getSeconds = time => time % 60 < 10 ? String(time % 60) + "0" : time % 60;

const render = state => {
	timer?.textContent = getMinutes(state.time);
	counter?.textContent = state.count
	document.title = `Swissdoro | ${getMinutes(state.time)}:${getSeconds(
		state.time
	)}`;
};

const updateState = newState => {
	state = merge(state,newState);
	render(state)
}