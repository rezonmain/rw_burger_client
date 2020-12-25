// Object to handle the loader animation stuff
const loader = {
	element: document.getElementById('loading'),
	remove() {
		document.getElementById('big-container').removeChild(this.element);
	}
}

// If previous request is x milliseconds old, get a new request, also get a new request if there's no entry in local storage
// This is to avoid unnecesary request each time user refreshes page
function getNumberOfBurgers(url) {
	if (readFromCache(url) === null || Date.now() - readFromCache(url).timestamp >= 10000) {
		console.log("Got it from API");
		fetch(url)
		.then(handleBadResponse) // Returns a promise with an error witch is handle in the .catch() method
		.then(response => response.json()) // Returns the response parsed to JSON
		.then(json => writeToCache(url, json)) // Returns the response so next function gets it
		.then(json => showNumberOfBurgers(json)) // Finally parses the reponse
		// Automaticamente se pasa el error como parametro de la funcion callback, el error viene de handleBadRespone (si esque produce un error)
		.catch(showErrorMessage) 
	}
	else if (readFromCache(url) !== null){
		console.log("Got it from cache")
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
	if (error.startsWith("TypeError: NetworkError")) {
		// Show its a connection error
		errorSpan.innerText = "Error de conexión, verifica si estás conectado a una red😓."
	}
	else {
		// Show a generic error
		errorSpan.innerText = "Se ha producido un error porfavor de refrescar la página🤕."
	}
	loader.remove();
	document.getElementById('error_text').appendChild(errorSpan);

}
// Parse incoming dat and show it in the DOM
function showNumberOfBurgers(data) {
	let burgerMade = 50 - data.number_burgers;
	loader.remove();
	let numberSpan = document.createElement('span');
	numberSpan.innerText = `${burgerMade}`;
	document.getElementById('number_container').appendChild(numberSpan);
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

let u = 'http://localhost:1337';
getNumberOfBurgers(u);
