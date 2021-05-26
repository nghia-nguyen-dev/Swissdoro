import { merge, pipe, compose } from "ramda";

const startBtn = document.querySelector(".start-btn");
const breakbtn = document.querySelector(".break-btn");
const startBtnText = document.querySelector(".start-btn__text");
let intervalId: number;

const SECONDS = 60;
const STUDY = 25;
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

function countDown() {
	if (startBtnText?.textContent === START) {
		intervalId = setInterval(() => {
			updateState({ time: state.time - 1, startTimer: true });
			console.log(state.time);
		}, 1000);
	} else {
		clearInterval(intervalId);
		console.log(state);
	}
}

const getMinutes = time => Math.floor(time / 60);
const getSeconds = time => time % 60;

const renderText = startTimer => (startTimer ? STOP : START);

const render = () => {};

const updateState = newState => {
	state = merge(state, newState);
	render(state);
};
