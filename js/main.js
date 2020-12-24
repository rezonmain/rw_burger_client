function getNumberOfBurgers() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    	.then(response => response.json())
    	.then(json => showNumberOfBurgsers(json.id))
}

getNumberOfBurgers();

function showNumberOfBurgsers(data) {
	let burgerMade = 50 - data;
	let loader = document.getElementById('loading');
	document.getElementById('big-container').removeChild(loader);
	let numberSpan = document.createElement('span');
	numberSpan.innerText = `${burgerMade}`;
	let adTextSpan = document.createElement('span');
	adTextSpan.innerText = "¡Asi que apresurate a pedir!"
	document.getElementById('number_container').appendChild(numberSpan);
	document.getElementById('frase_text').appendChild(adTextSpan);

}
