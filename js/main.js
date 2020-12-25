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
	document.getElementById('number_container').appendChild(numberSpan);

}

// Todo implement function that saves data from api to local storage
// to use cache data instead of making request everytime