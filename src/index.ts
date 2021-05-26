import { merge, pipe, compose } from "ramda";

let state = {
	time: 25,
	count: 0,
	darkMode: true,
};

const Timer = time => `<h1>${time}</h1>`;

const Counter = count => {
    return `
        <div class="Counter circle circle--fill">
            <h3>${count}</h3>
        </div>
    `;
};

const Controls = () => {
	return `
        <div class="Controls">
      
        </div>
    `;
};

const UI = state => {
	return `
        <div class="UI">
            ${Counter(state.count)}
            ${Controls()}
        </div>
    `;
};

const App = state => {
	return `
        <div class="App">
            ${Timer(state.time)}
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
