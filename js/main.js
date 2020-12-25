function getNumberOfBurgers() {
	fetch('https://jsonplaceholder.typicode.com/todos/1')
		.then(handleBadResponse)
    	.then(response => response.json())
		.then(json => showNumberOfBurgers(json.id))
		// Automaticamente pasa el error como parametro de la funcion callback, el error viene de handleBadRespone (si esque produce un error)
		.catch(showErrorMessage) 
}

function handleBadResponse(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response; 
}

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

function showNumberOfBurgers(data) {
	let burgerMade = 50 - data;
	loader.remove();
	let numberSpan = document.createElement('span');
	numberSpan.innerText = `${burgerMade}`;
	document.getElementById('number_container').appendChild(numberSpan);
}

// Object named loader to handle the loader animation stuff
const loader = {
	element: document.getElementById('loading'),
	remove() {
		document.getElementById('big-container').removeChild(this.element);
	}
}

getNumberOfBurgers();


// Todo implement function that saves data from api to local storage
// to use cache data instead of making request everytime