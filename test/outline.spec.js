const expect = require('chai').expect;
const cheerio = require('cheerio');

describe('outline.js', () => {

    const target = require('../lib/outline').load;
    const option = require('../lib/option');

    describe('load()', () => {

        let input = `
            <h1 id="1">1. chapter</h1>
            <p>foo</p>
            <h2 id="1.1">1.1 section</h2>
            <p>foo</p>
            <h3 id="1.1.1">1.1.1 subsection</h3>
            <p>foo</p>
            <h3 id="1.1.2">1.1.2 subsection</h3>
            <p>foo</p>
            <h2 id="1.2">1.2 section</h2>
            <p>foo</p>
            <h3 id="1.2.1">1.2.1 subsection</h3>
            <p>foo</p>
            <h3 id="1.2.2">1.2.2 subsection</h3>
            <p>foo</p>
            <h1 id="2">2. chapter</h1>
            <p>foo</p>
            <h2 id="2.1">2.1 section</h2>
            <p>foo</p>
            <h3 id="2.1.1">2.1.1 subsection</h3>
            <p>foo</p>
            <h3 id="2.1.2">2.1.2 subsection</h3>
            <p>foo</p>
            <h2 id="2.2">2.2 section</h2>
            <p>foo</p>
            <h3 id="2.2.1">2.2.1 subsection</h3>
            <p>foo</p>
            <h3 id="2.2.2">2.2.2 subsection</h3>
            <p>foo</p>
        `;

        let outline = target(input, option.defaultOptions);

        it('1st level: # of items', () => {
            expect(outline.length).to.equals(2);
        });

        it('1st level: headline', () => {
            expect(outline[1].headline).to.equals('2. chapter');
        });

        it('1st level: id', () => {
            expect(outline[1].id).to.equals('2');
        });

        it('2nd level: # of items', () => {
            expect(outline[1].children.length).to.equals(2);
        });

        it('2nd level: headline', () => {
            expect(outline[1].children[1].headline).to.equals('2.2 section');
        });

        it('2nd level: id', () => {
            expect(outline[1].children[1].id).to.equals('2.2');
        });

        it('3rd level: # of items', () => {
            expect(outline[1].children[1].children.length).to.equals(2);
        });

        it('3rd level: headline', () => {
            expect(outline[1].children[1].children[1].headline).to.equals('2.2.2 subsection');
        });

        it('3rd level: id', () => {
            expect(outline[1].children[1].children[1].id).to.equals('2.2.2');
        });

    });


});
