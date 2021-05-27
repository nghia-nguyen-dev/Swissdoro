import { merge } from "ramda";
import { SECONDS, STUDY, BREAK, START } from "./constants";
import { startBtnText, startBtn, breakBtn } from "./domRefs";
import { NewState, State } from "./interfaces";
import { render } from "./renders";

let intervalId: number;

let state = {
	time: STUDY * SECONDS,
	count: 0,
	timerHasStarted: false,
	takeBreak: false,
};

const reset = () => {
	updateState({
		count: state.count + 1,
		timerHasStarted: false,
	});
	clearInterval(intervalId);
};

const startCountDown = () => {
	console.log(`Start studying bro!`);

	if (state.time <= 0)
		updateState({ time: STUDY * SECONDS, timerHasStarted: true });

	intervalId = setInterval(() => {
		if (state.time <= 0) return reset();
		updateState({ time: state.time - 1, timerHasStarted: true });
	}, 1000);
};

const startBreak = () => {
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
			return;
		}
		updateState({ time: state.time - 1 });
	}, 1000);
};

const stopCountDown = () => {
	clearInterval(intervalId);
	updateState({ timerHasStarted: false });
};

const handleClick = () =>
	startBtnText?.textContent === START ? startCountDown() : stopCountDown();

startBtn?.addEventListener("click", handleClick);
breakBtn?.addEventListener("click", startBreak);

const updateState = (newState: NewState) => {
	state = merge(state, newState) as State;
	render(state);
};
