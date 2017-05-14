const cheerio = require('cheerio');

function load(input, options) {
    const CHAPTER = options.outline.chapter.selector,
        SECTION = options.outline.section.selector,
        SUBSECTION = options.outline.subsection.selector,
        CHAPTER_ATTR = options.outline.chapter.hashAttr,
        SECTION_ATTR = options.outline.section.hashAttr,
        SUBSECTION_ATTR = options.outline.section.hashAttr;
    let $ = cheerio.load(input);
    let outline = [];
    $(CHAPTER).each((index, elem) => {
        let $chapter = $(elem);
        outline[index] = {
            headline: $chapter.text(),
            id: $chapter.attr(CHAPTER_ATTR),
            children: []
        };
        $chapter.nextUntil(CHAPTER).filter(SECTION).each((iindex, eelem) => {
            let $section = $(eelem);
            outline[index].children[iindex] = {
                headline: $section.text(),
                id: $section.attr(SECTION_ATTR),
                children: []
            };
            $section.nextUntil(SECTION).filter(SUBSECTION).each((iiindex, eeelem) => {
                let $subsection = $(eeelem);
                outline[index].children[iindex].children[iiindex] = {
                    headline: $subsection.text(),
                    id: $subsection.attr(SUBSECTION_ATTR)
                };
            });
        });
    });
    return outline;
}

module.exports.load = load;
