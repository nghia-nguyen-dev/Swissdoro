import { merge, pipe, compose } from "ramda";
const SECONDS = 60;
const STUDY = 25;
const BREAK = 5;

let state = {
	time: STUDY * SECONDS,
	break: BREAK * SECONDS,
	count: 0,
	mode: "timer",
};

const getMinutes = time => Math.floor(time / 60);
const getSeconds = time => time % 60;

const Timer = state => `<h1>${getMinutes(state.time)}</h1>`;

const Counter = state =>
	`<h3 class="Counter circle circle--fill">${state.count}</h3>`;

const Controls = state => {
	return `
        <div class="Controls">
            <button class="Controls__btn circle circle--outline-blue start-btn">
                <h3 class="start-btn__text">start</h3>
            </button>
            <button class="Controls__btn circle circle--outline-blue">
                <h3>break</h3>
            </button>
        </div>
    `;
};

const UI = state => {
	return `
        <div class="UI">
            ${Counter(state)}
            ${Controls(state)}
        </div>
    `;
};

const App = state => {
	return `
        <div class="App">
            ${Timer(state)}
            ${UI(state)}
        </div>
    `;
};

const render = state => {
	const root = document.querySelector("#root");
	root.innerHTML = App(state);
};

const updateState = newState => {
	state = merge(state, newState);
	render(state);
};

render(state);

const toggleText = textContent => {
	return textContent === "start" ? "stop" : "start";
};

const startBtn = document.querySelector(".start-btn");
const startBtnText = document.querySelector(".start-btn__text");

startBtn.onclick = function () {
	// startBtnText?.textContent = toggleText(startBtnText?.textContent);

	setInterval(() => {
		updateState({ time: state.time - 1 });
		console.log(state.time);
	}, 1000);
};
