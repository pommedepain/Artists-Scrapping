const axios = require("axios");
const fs = require('fs');

const siteUrl = "https://www.hauserwirth.com/artists";
const artists = new Set();

// We fetch the htlm from the given url and return it.
const fetchData = async () => {
	try {
		const result = await axios.get(siteUrl);
		return (result.data);
	}

	catch (err) {
		console.log('Error', new Error('Could not fetch the html from the site URL.'));
	}
};

// We extract the artists's name and their total to organize them in an array.
const getResults = async () => {
	try {
		const $ = await fetchData();

		// We extract the main layout of the page.
		const layout = $.substring($.search(/<main/is), $.search(/<\/main>/is));
		// We divide the string into an array with an entry for each list <ul>.
		const arrayUl = layout.split(/<ul>/is);
		// We remove the first index of the array which doesn't contain a list.
		arrayUl.splice(0, 1);

		let arrayLi = arrayUl;
		// We split each list into an array of the elements it contains.
		for (let i = 0; i < arrayUl.length ; i++) {
			arrayLi[i] = arrayUl[i].split(/<li>/is);
			// For each element, we get rid of html and only keep the inner text (the names).
			for (let j = 0; j < arrayLi[i].length; j++) {
				const artistBegIndex = arrayLi[i][j].search(/title=""><span>/is);
				const artistEndIndex = arrayLi[i][j].search(/<\/span>/is);
				const artistName = arrayLi[i][j].substring(artistBegIndex + 15, artistEndIndex);
				if (artistName !== "" && artistName !== null && artistName !== undefined)
					artists.add(artistName);
			}
		}

		return {
			Artists: [...artists],
			Total: [...artists].length,
		};
	}

	catch (err) {
		console.log('Error', new Error('Could not parse the data.'));
	}
}

// We save the resulted array in a json file.
const saveAsJson = async () => {
	try {
		const artistList = await getResults();
		let jsonString = JSON.stringify(artistList);

  	fs.writeFileSync('./output-MyParser.json', jsonString, 'utf-8');
	}

	catch (err) {
		console.log('Error', new Error('Could not save the parsed data into a json file.'));
	}
};

module.exports = saveAsJson;
