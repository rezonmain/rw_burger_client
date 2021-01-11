// Utility function to save to localstorage
export function writeToCache(url, data) {
	localStorage.setItem(url, JSON.stringify(data));
	return data;
}

// Utility function to read form local storage
export function readFromCache(url) {
	return JSON.parse(localStorage.getItem(url)) || null;
}
