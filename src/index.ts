import { merge } from "ramda";

const timer = document.querySelector(".timer");
const counter = document.querySelector(".counter");
const startBtnText = document.querySelector(".start-btn__text");
const startBtn = document.querySelector(".start-btn");
const breakBtn = document.querySelector(".break-btn");

let intervalId: number;

const SECONDS = 5;
const STUDY = 2;
const BREAK = 1;
const START = "start";
const STOP = "stop";

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
	console.log(`start studying`);

	if (state.time <= 0)
		updateState({ time: STUDY * SECONDS, timerHasStarted: true });

	intervalId = setInterval(() => {
		if (state.time <= 0) return reset();
		updateState({ time: state.time - 1, timerHasStarted: true });
	}, 1000);
};

const startBreak = () => {
	console.log(`taking a break`);
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

const renderBtnText = state =>
	(startBtnText?.textContent = state.timerHasStarted ? STOP : START);
const renderTime = state => (timer?.textContent = getMinutes(state.time));
const renderCounter = state => (counter?.textContent = state.count);
const renderTitleTime = state =>
	(document.title = `Swissdoro | ${getMinutes(state.time)}:${getSeconds(
		state.time
	)}`);

const renderBreakBtn = state => {
	if (state.timerHasStarted) breakBtn.disabled = true;
	if (state.time <= 0) breakBtn.disabled = false;
};

const getMinutes = time =>
	Math.floor(time / 60) < 10
		? "0" + String(Math.floor(time / 60))
		: Math.floor(time / 60);
const getSeconds = time =>
	time % 60 < 10 ? "0" + String(time % 60) : time % 60;

const render = state => {
	startBtn.disabled = state.takeBreak ? true : false;
	renderBreakBtn(state);
	renderBtnText(state);
	renderTime(state);
	renderTitleTime(state);
	renderCounter(state);
};

const updateState = newState => {
	state = merge(state, newState);
	render(state);
};
