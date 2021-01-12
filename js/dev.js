import { getNumberOfBurgers, url } from './main.js';
import * as dom from './domHandler.js';
let e = document.getElementById('burger-button');
let c = 0;
e.addEventListener('click', () => {
	c++;
	if (c >= 3) {
		dom.numberOfBurgers.hide();
		dom.loader.add();
		dom.hideAllErrors();
		getNumberOfBurgers(url);
		c = 0;
	}
});
