const expect = require('chai').expect;
const cheerio = require('cheerio');

describe('loader.js', () => {

    const target = require('../lib/loader');

    describe('default option', () => {

        let input = `
            <h1>1. chapter</h1>
            <p>foo</p>
            <h2>1.1 section</h2>
            <p>foo</p>
            <h3>1.1.1 subsection</h3>
            <p>foo</p>
            <h3>1.1.2 subsection</h3>
            <p>foo</p>
            <h2>1.2 section</h2>
            <p>foo</p>
            <h3>1.2.1 subsection</h3>
            <p>foo</p>
            <h3>1.2.2 subsection</h3>
            <p>foo</p>
            <h1>2. chapter</h1>
            <p>foo</p>
            <h2>2.1 section</h2>
            <p>foo</p>
            <h3>2.1.1 subsection</h3>
            <p>foo</p>
            <h3>2.1.2 subsection</h3>
            <p>foo</p>
            <h2>2.2 section</h2>
            <p>foo</p>
            <h3>2.2.1 subsection</h3>
            <p>foo</p>
            <h3>2.2.2 subsection</h3>
            <p>foo</p>
        `;
        let $;
        let output;

        it('', () => {

        });

    });


});
