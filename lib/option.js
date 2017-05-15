const merge = require('lodash.merge');

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
    contents: {
        outlet: {
            selector: '#contents'
        },
        list: {
            parentTagName: 'ol',
            childTagName: 'li'
        },
        anchor: {
            template: '<a href="#[hash]">[content]</a>'
        }
    }
}

function assignDefault(options) {
    return merge({}, defaultOptions, options);
}

module.exports.assignDefault = assignDefault;
module.exports.defaultOptions = defaultOptions;
