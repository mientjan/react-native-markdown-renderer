const MarkdownIt = require('markdown-it');
const copy = require('./example');
const fs = require('fs');

console.log(copy);

const md = MarkdownIt({
	typographer: true,
})

fs.writeFile('./export.json', JSON.stringify(md.parse(copy, {})), err => {
	if(err) console.log('err', err);
})