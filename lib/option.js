const defaultOptions = {
    selector: {
        outline: {
            chapter: 'h1',
            section: 'h2',
            subsection: 'h3'
        },
        id: {
            chapter: 'self',
            section: 'self',
            subsection: 'self'
        },
        headline: {
            chpater: 'self',
            section: 'self',
            subsection: 'self'
        },
        outlet: '#contents'
    }
}

function assignDefault(options) {
    return Object.assign({}, defaultOptions, options);
}

module.exports.assignDefault = assignDefault;
module.exports.defaultOptions = defaultOptions;
