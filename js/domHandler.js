import * as date from './dateHandler.js';
export const loader = {
	remove() {
		const e = document.getElementById('loading');
		e.style.display = 'none';
	},
	add() {
		const e = document.getElementById('loading');
		e.style.display = 'block';
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
export let numberOfBurgers = {
	numberSpan: document.getElementById('number_burgers'),
	show(data) {
		let burgerMade = 50 - data.number_burgers;
		if (burgerMade < 0) {
			burgerMade = 0;
		}
		loader.remove();
		this.numberSpan.style.display = 'block';
		this.numberSpan.innerText = `${burgerMade}`;
		dateStr.show(data.timestamp);
		showSidenote();
	},
	hide() {
		this.numberSpan.style.display = 'none';
	},
};

export let dateStr = {
	dateSpan: document.createElement('span'),
	show(ts) {
		let dateStr = date.getDateString(ts);
		this.dateSpan.innerText = dateStr + '📅';
		document.getElementById('date_text').appendChild(this.dateSpan);
	},
	hide() {
		document.getElementById('date_text').removeChild(this.dateSpan);
	},
};

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

export function hideAllErrors() {
	document.getElementById('closed_text').style.display = 'none';
	document.getElementById('error_text').style.display = 'none';
}
