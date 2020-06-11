const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

// Parser à la mano avec meilleures perfs (timer)

const siteUrl = "https://www.hauserwirth.com/artists";
const artists = new Set();

// We fetch the htlm from the given url and return a parsed result.
const fetchData = async () => {
	const result = await axios.get(siteUrl);
  return cheerio.load(result.data);
};

// We extract the title, the list of artists and their total to organize them.
const getResults = async () => {
	const $ = await fetchData();
	let total = 0;

	const title = $('.hw-artists > .hw-page-header > .hw-page-header__content.container > .page-title').text();
	// For each artist, we store their name and count them in the total.
	$('.hw-artists > .hw-collection-index.container').find($('.hw-link')).each((index, elem) => {
		artists.add($(elem).text());
		if ($(elem).text()) {
			total += 1;
		}
	});

	return {
		[title]: [...artists].sort(),
		Total: total,
	};
}

// We save the resulted array in a json file.
const saveAsJson = async () => {
	const artistList = await getResults();
	let jsonString = JSON.stringify(artistList);

  fs.writeFileSync('./output.json', jsonString, 'utf-8');
};

saveAsJson();
