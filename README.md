# Artists-Scrapping

Scrapping of https://www.hauserwirth.com's list of artists, for parsing and saving the result in a json file.

## Usage

```
gcl https://github.com/pommedepain/Artists-Scrapping.git
npm i
npm start
```

There are two resulting arrays:
<ul>
	<li>The first one, using the parser module Cheerio, is stored in the `output-Cheerio.json` file.</li>
	<li>The second one, using my own parser, is stored in the `output-MyParser.json` file.</li>
</ul>
A performance score for each technique is displayed in the console in milliseconds.

You can also clean the repository by running:

````
npm run clean
```
