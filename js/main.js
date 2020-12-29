// Object to handle the loader animation stuff
import { getFullMonthSpanish, getNameDaySpanish } from './dateSpanish.js';

const loader = {
	element: document.getElementById('loading'),
	remove() {
		document.getElementById('big-container').removeChild(this.element);
	},
};
// If previous request is x milliseconds old, get a new request, also get a new request if there's no entry in local storage
// This is to avoid unnecesary request each time user refreshes page
function getNumberOfBurgers(url) {
	if (readFromCache(url) === null || Date.now() - readFromCache(url).timestamp >= 10000) {
		fetch(url)
			.then(handleBadResponse) // Returns a promise with an error witch is handle in the .catch() method
			.then((response) => response.json()) // Returns the response parsed to JSON
			.then((json) => writeToCache(url, json)) // Returns the response so next function gets it
			.then((json) => showNumberOfBurgers(json)) // Finally parses the reponse
			// Automaticamente se pasa el error como parametro de la funcion callback, el error viene de handleBadRespone (si esque produce un error)
			.catch(showErrorMessage);
	} else if (readFromCache(url) !== null) {
		showNumberOfBurgers(readFromCache(url));
	}
}

function handleBadResponse(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

// Parse incoming errors and show them in the DOM
function showErrorMessage(error) {
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
// Parse incoming dat and show it in the DOM
function showNumberOfBurgers(data) {
	let burgerMade = 50 - data.number_burgers;
	if (burgerMade < 0) {
		burgerMade = 0;
	}
	loader.remove();
	let numberSpan = document.createElement('span');
	numberSpan.innerText = `${burgerMade}`;
	document.getElementById('number_container').appendChild(numberSpan);
	showDate();
	showSidenote();
}

// Utility function to save to localstorage
function writeToCache(url, data) {
	localStorage.setItem(url, JSON.stringify(data));
	return data;
}

// Utility function to read form local storage
function readFromCache(url) {
	return JSON.parse(localStorage.getItem(url)) || null;
}

function showDate() {
	let d = new Date();
	let day = getNameDaySpanish(d.getDay()).toLowerCase();
	let date = d.getDate().toString();
	let month = getFullMonthSpanish(d.getMonth()).toLowerCase();
	let year = d.getFullYear().toString();
	let hour = d.getHours().toString();
	let minute = d.getMinutes().toString();
	if (minute.length === 1) {
		minute = '0' + minute;
	}
	let dateSpan = document.createElement('span');
	dateSpan.innerText = 'a ' + day + ' ' + date + ' de ' + month + ' del ' + year + ' ' + hour + ':' + minute + ' 📅';
	document.getElementById('date_text').appendChild(dateSpan);
}

function showSidenote() {
	let element = document.getElementById('sidenote-text');
	element.style.display = 'block';
}

// When in development send request to local dev server
let u = window.location.host === '127.0.0.1:5500' || '192.168.0.9:5000' ? 'http://192.168.0.9:5000/number' : 'https://redwagon-api.herokuapp.com/number';
getNumberOfBurgers(u);
