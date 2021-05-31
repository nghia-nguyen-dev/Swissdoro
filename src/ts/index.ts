import { merge } from "ramda";
import { SECONDS, STUDY, BREAK, START } from "./constants";
import { btnLabel, startBtn, breakBtn } from "./domRefs";
import { NewState, State } from "./interfaces";
import { render } from "./renders";
import playAudio from "./playAudio";
import sheesh from "../assets/sheesh.mp3";

let intervalId: number;

let state = {
	time: STUDY * SECONDS,
	count: 0,
	timerHasStarted: false,
	takeBreak: false,
};

const incrementCounter = (amount: number) => {
	updateState({
		count: state.count + amount,
		timerHasStarted: false,
	});
};

const reset = () => {
	clearInterval(intervalId);
	playAudio(sheesh);
	incrementCounter(1);
};

const setTimer = (time: number) => updateState({ time: time });

const decrementTime = () => {
	intervalId = setInterval(() => {
		if (state.time <= 0) return reset();
		updateState({ time: state.time - 1, timerHasStarted: true });
	}, 1000);
};

const startCountDown = () => {
	console.log(`Start studying bro!`);
	if (state.time <= 0) setTimer(STUDY * SECONDS);
	decrementTime();
};

const setBreakTimer = (time: number) => {
	updateState({
		time: time,
		timerHasStarted: true,
		takeBreak: true,
	});
};

const handleBreakClick = () => {
	console.log(`Take a break my guy!`);
	setBreakTimer(BREAK * SECONDS);

	intervalId = setInterval(() => {
		if (state.time <= 0) {
			updateState({ timerHasStarted: false, takeBreak: false });
			clearInterval(intervalId);
			playAudio(sheesh);
			return;
		}
		updateState({ time: state.time - 1 });
	}, 1000);
};

const stopCountDown = () => {
	clearInterval(intervalId);
	updateState({ timerHasStarted: false });
};

const handleStartClick = () =>
	btnLabel?.textContent === START ? startCountDown() : stopCountDown();

const updateState = (newState: NewState) => {
	state = merge(state, newState) as State;
	render(state);
};

startBtn?.addEventListener("click", handleStartClick);
breakBtn?.addEventListener("click", handleBreakClick);
