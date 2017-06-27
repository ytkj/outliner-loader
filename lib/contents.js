const cheerio = require('cheerio');

function contents(outlines, options) {
    const OUTLET = options.contents.outlet.selector,
        LIST_PARENT_TAG = options.contents.list.parentTagName,
        LIST_CHILD_TAG = options.contents.list.childTagName,
        ANCHOR = (hash, content) => options.contents.anchor.template.replace('[hash]', hash).replace('[content]', content);
    let $ = cheerio.load('<div id="tmp-contens-root"></div>', { xmlMode: false, decodeEntities: false });
    let $ul = cheerio('<' + LIST_PARENT_TAG + '>');
        $('#tmp-contens-root').append($ul);
    outlines.forEach(chapter => {
        let $li = cheerio('<' + LIST_CHILD_TAG + '>').html(ANCHOR(chapter.id, chapter.headline));
        $ul.append($li);
        let $$ul= cheerio('<' + LIST_PARENT_TAG + '>');
        if (chapter.children.length > 0) {
            $li.append($$ul);
        }
        chapter.children.forEach(section => {
            let $$li = cheerio('<' + LIST_CHILD_TAG + '>').html(ANCHOR(section.id, section.headline));
            $$ul.append($$li);
            let $$$ul = cheerio('<' + LIST_PARENT_TAG + '>');
            if (section.children.length > 0) {
                $$li.append($$$ul);
            }
            section.children.forEach(subsection => {
                let $$$li = cheerio('<' + LIST_CHILD_TAG + '>').html(ANCHOR(subsection.id, subsection.headline));
                $$$ul.append($$$li);
            });
        });
    });
    return $('#tmp-contens-root').html();
}

module.exports = contents;
