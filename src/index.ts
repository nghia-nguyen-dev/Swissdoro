import { merge, pipe, compose } from "ramda";

let state = {
	time: {
        min: 25,
        sec: 60
    },
	count: 0,
	darkMode: true,
};

const Timer = time => `<h1>${time}</h1>`;

const Counter = count => {
	return `
         <svg width="118px" height="118px" viewBox="0 0 118 118" version="1.1">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                 <circle id="circle" stroke="#0000EF" cx="59" cy="59" r="58.5"></circle>
             </g>
        </svg>
    `;
};

const Controls = () => {
	return `
        <div class="Controls">
            <div class="Counter circle circle--outline-blue">
                <h3>start</h3>
            </div>
            <div class="Counter circle circle--outline-blue">
                <h3>break</h3>
            </div>
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
            ${Timer(state.time.min)}
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
