const defaultOptions = {
    outline: {
        chapter: {
            selector: 'h1',
            hashAttr: 'id'
        },
        section: {
            selector: 'h2',
            hashAttr: 'id'
        },
        subsection: {
            selector: 'h3',
            hashAttr: 'id'
        }
    },
    index: {
        outlet: {
            selector: '#contents'
        },
        list: {
            parentTagName: 'ul',
            childTagName: 'li'
        },
        anchor: {
            template: '<a href="#[hash]">'
        }
    }
}

function assignDefault(options) {
    return Object.assign({}, defaultOptions, options);
}

module.exports.assignDefault = assignDefault;
module.exports.defaultOptions = defaultOptions;
