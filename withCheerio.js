const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

const siteUrl = "https://www.hauserwirth.com/artists";
const artists = new Set();

// We fetch the htlm from the given url and return a parsed result.
const fetchData = async () => {
	try {
		const result = await axios.get(siteUrl);
  	return cheerio.load(result.data);
	}

	catch (err) {
		console.log('Error', new Error('Could not fetch the html from the site URL.'));
	}
};

// We extract the title, the list of artists and their total to organize them.
const getResults = async () => {
	try {
		const $ = await fetchData();

		const title = $('.hw-artists > .hw-page-header > .hw-page-header__content.container > .page-title').text();
		// For each artist, we store their name.
		$('.hw-artists > .hw-collection-index.container').find($('.hw-link')).each((index, elem) => {
			artists.add($(elem).text());
		});

		return {
			[title]: [...artists],
			Total: [...artists].length,
		};
	}

	catch (err) {
		console.log('Error', new Error('Could not parse the data through Cheerio.'));
	}
}

// We save the resulted array in a json file.
const saveAsJson = async () => {
	try {
		const artistList = await getResults();
		let jsonString = JSON.stringify(artistList);

  	fs.writeFileSync('./output-Cheerio.json', jsonString, 'utf-8');
	}
	
	catch (err) {
		console.log('Error', new Error('Could not save the parsed data into a json file.'));
	}
};

module.exports = saveAsJson;
