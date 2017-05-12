const cheerio = require('cheerio');

function load(input, options) {
    const CHAPTER = options.selector.outline.chapter;
    const SECTION = options.selector.outline.section;
    const SUBSECTION = options.selector.outline.subsection;
    let $ = cheerio.load(input);
    let outline = [];
    $(CHAPTER).each((index, elem) => {
        let $chapter = $(elem);
        outline[index] = {
            headline: $chapter.text(),
            id: $chapter.attr('id'),
            children: []
        };
        $chapter.nextUntil(CHAPTER).filter(SECTION).each((iindex, eelem) => {
            let $section = $(eelem);
            outline[index].children[iindex] = {
                headline: $section.text(),
                id: $section.attr('id'),
                children: []
            };
            $section.nextUntil(SECTION).filter(SUBSECTION).each((iiindex, eeelem) => {
                let $subsection = $(eeelem);
                outline[index].children[iindex].children[iiindex] = {
                    headline: $subsection.text(),
                    id: $subsection.attr('id')
                };
            });
        });
    });
    return outline;
}

module.exports.load = load;
