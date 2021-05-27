import { breakBtn, startBtn, startBtnText, timer, counter } from "./domRefs";
import { STOP, START } from "./constants";
import { getMinutes, getSeconds } from "./utils";
import { State } from "./interfaces";

export const renderBreakBtn = (state: State) => {
	if (state.timerHasStarted) breakBtn.disabled = true;
	if (state.time <= 0) breakBtn.disabled = false;
};

export const renderStartBtn = (state: State) => {
	startBtn.disabled = state.takeBreak ? true : false;
	startBtnText.textContent = state.timerHasStarted ? STOP : START;
};

export const renderTime = (state:State) => (timer.textContent = getMinutes(state.time));

export const renderTitleTime = (state:State) =>
	(document.title = `Swissdoro | ${getMinutes(state.time)}:${getSeconds(
		state.time
	)}`);

export const renderCounter = (state:State) => (counter.textContent = String(state.count));

export const render = (state:State) => {
	renderBreakBtn(state);
	renderStartBtn(state);
	renderTime(state);
	renderTitleTime(state);
	renderCounter(state);
};
