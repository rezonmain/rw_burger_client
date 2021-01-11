import * as date from './dateHandler.js';
const loader = {
	remove() {
		const e = document.getElementById('loading');
		document.getElementById('big-container').removeChild(e);
	},
};
// Parse incoming errors and show them in the DOM
export function showErrorMessage(error) {
	error = error.toString();
	let errorSpan = document.createElement('span');
	if (error.startsWith('TypeError: NetworkError')) {
		// Show its a connection error
		errorSpan.innerText = 'Error de conexión, verifica si estás conectado a una red😓.';
	} else {
		// Show a generic error
		errorSpan.innerText = 'Se ha producido un error porfavor de refrescar la página🤕.';
	}
	loader.remove();
	document.getElementById('error_text').appendChild(errorSpan);
}

export function showNumberOfBurgers(data) {
	let burgerMade = 50 - data.number_burgers;
	if (burgerMade < 0) {
		burgerMade = 0;
	}
	loader.remove();
	let numberSpan = document.createElement('span');
	numberSpan.innerText = `${burgerMade}`;
	document.getElementById('number_container').appendChild(numberSpan);
	showDate(data.timestamp);
	showSidenote();
}

function showDate(ts) {
	let dateStr = date.getDateString(ts);
	let dateSpan = document.createElement('span');
	dateSpan.innerText = dateStr + '📅';
	document.getElementById('date_text').appendChild(dateSpan);
}

function showSidenote() {
	let element = document.getElementById('sidenote-text');
	element.style.display = 'block';
}

export function showWeAreClosedToday() {
	let closedSpan = document.createElement('span');
	closedSpan.innerText = 'Nos encontramos cerrados 😓\n¡Los esperamos el jueves a las 2pm!';
	loader.remove();
	document.getElementById('closed_text').appendChild(closedSpan);
}

export function showWeAreClosed() {
	let closedSpan = document.createElement('span');
	closedSpan.innerText = 'Nos encontramos cerrados 😓\nAbrimos a las 2pm.';
	loader.remove();
	document.getElementById('closed_text').appendChild(closedSpan);
}
