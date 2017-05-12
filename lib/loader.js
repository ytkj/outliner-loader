const cheerio = require('cheerio');

const option = require('./option');
const outline = require('./outline');

function loader(input, options) {
    options = option.assignDefault(options);
    let outlines = outline.load(input, options);
}

module.exports = loader;
