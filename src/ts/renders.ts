import { breakBtn, startBtn, startBtnText, timer, counter } from "./domRefs";
import { STOP, START } from "./constants";
import { getMinutes, getSeconds } from "./utils";

export const renderBreakBtn = state => {
	if (state.timerHasStarted) breakBtn.disabled = true;
	if (state.time <= 0) breakBtn.disabled = false;
};

export const renderStartBtn = state => {
	startBtn.disabled = state.takeBreak ? true : false;
	startBtnText?.textContent = state.timerHasStarted ? STOP : START;
};

export const renderTime = state =>
	(timer?.textContent = getMinutes(state.time));

export const renderTitleTime = state =>
	(document.title = `Swissdoro | ${getMinutes(state.time)}:${getSeconds(
		state.time
	)}`);

export const renderCounter = state => (counter?.textContent = state.count);

export const render = state => {
	renderBreakBtn(state);
	renderStartBtn(state);
	renderTime(state);
	renderTitleTime(state);
	renderCounter(state);
};
