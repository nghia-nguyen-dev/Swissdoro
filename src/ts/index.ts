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

const reset = () => {
	playAudio(sheesh);
	updateState({
		count: state.count + 1,
		timerHasStarted: false,
	});
	clearInterval(intervalId);
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

const handleBreakClick = () => {
	console.log(`Take a break my guy!`);
	updateState({
		time: BREAK * SECONDS,
		timerHasStarted: true,
		takeBreak: true,
	});

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
