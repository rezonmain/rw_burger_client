// Object to handle the loader animation stuff
import { readFromCache, writeToCache } from './utils.js';
import * as date from './dateHandler.js';
import * as dom from './domHandler.js';

function handleClosedHours() {
	let localTime = date.localTime;
	let openingHour = date.localOpeningHour;
	let closingHour = date.getClosingTime(localTime.weekday);
	// If closing hours returns null, it means restaurant does not open that day of the week
	if (closingHour === null) {
		dom.showWeAreClosedToday();
		return;
		// Show we are closed message if we are outside of working hours (2pm - 9pm)
	} else if (localTime.hour >= closingHour && localTime.hour < openingHour) {
		dom.showWeAreClosed();
		return;
		// Monday night, restaurant opens untill thursday
	} else if (localTime.weekday === 1 && localTime.hour >= closingHour) {
		dom.showWeAreClosedToday();
		return;
	} else {
		getNumberOfBurgers(url);
	}
}
// If previous request is x milliseconds old, get a new request, also get a new request if there's no entry in local storage
// This is to avoid unnecesary request each time user refreshes page
function getNumberOfBurgers(url) {
	if (readFromCache(url) === null || Date.now() - readFromCache(url).timestamp >= 10000) {
		fetch(url)
			.then(handleBadResponse) // Returns a promise with an error witch is handle in the .catch() method
			.then((response) => response.json()) // Returns the response parsed to JSON
			.then((json) => writeToCache(url, json)) // Returns the response so next function gets it
			.then((json) => dom.showNumberOfBurgers(json)) // Finally parses the reponse
			// Automaticamente se pasa el error como parametro de la funcion callback, el error viene de handleBadRespone (si esque produce un error)
			.catch(dom.showErrorMessage);
	} else if (readFromCache(url) !== null) {
		dom.showNumberOfBurgers(readFromCache(url));
	}
}

function handleBadResponse(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

// When in development send request to local dev server
let url;
if (window.location.host === '127.0.0.1:5500' || window.location.host === '192.168.0.9:5500') {
	url = 'http://192.168.0.9:5000/number';
} else {
	url = 'https://redwagon-api.herokuapp.com/number';
}
handleClosedHours();
