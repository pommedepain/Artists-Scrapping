const saveAsJsonCheerio = require('./withCheerio');
const saveAsJsonMyParser = require('./myParser');

const WhichIsOpti = () => {
	console.time('Cheerio score');
	saveAsJsonCheerio();
	console.timeEnd('Cheerio score');

	console.time('MyParser score');
	saveAsJsonMyParser();
	console.timeEnd('MyParser score');
}

WhichIsOpti();
