const cheerio = require('cheerio');

const option = require('./option');
const outline = require('./outline');
const contents = require('./contents');

function loader(input, options) {
    options = option.assignDefault(options);
    const OUTLET = options.contents.outlet.selector;
    let outlines = outline(input, options);
    let contentsHtml = contents(outlines, options);
    let $ = cheerio.load(input, { xmlMode: true, decodeEntities: false });
    $(OUTLET).html(contentsHtml);
    return $.html();
}

module.exports = loader;
