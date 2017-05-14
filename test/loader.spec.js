const expect = require('chai').expect;
const cheerio = require('cheerio');

describe('loader.js', () => {

    const target = require('../lib/loader');
    const option = require('../lib/option');

    describe('default option', () => {

        let input = `
            <div id="contents"></div>
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
        let $;
        let output = target(input, option.defaultOptions);

        beforeEach(() => {
            $ = cheerio.load(output);
        });

        it('table of contents is created', () => {
            expect($('#contents>ol>li>ol>li>ol>li').eq(7).html()).to.equals('<a href="#2.2.2">2.2.2 subsection</a>');
        });

    });

    describe('assign options', () => {

        let input = `
            <div id="toc-outlet"></div>
            <wiki-h h-level="1" h-id="1">1. chapter</wiki-h>
            <p>foo</p>
            <wiki-h h-level="2" h-id="1.1">1.1 section</wiki-h>
            <p>foo</p>
            <wiki-h h-level="3" h-id="1.1.1">1.1.1 subsection</wiki-h>
            <p>foo</p>
            <wiki-h h-level="3" h-id="1.1.2">1.1.2 subsection</wiki-h>
            <p>foo</p>
            <wiki-h h-level="2" h-id="1.2">1.2 section</wiki-h>
            <p>foo</p>
            <wiki-h h-level="3" h-id="1.2.1">1.2.1 subsection</wiki-h>
            <p>foo</p>
            <wiki-h h-level="3" h-id="1.2.2">1.2.2 subsection</wiki-h>
            <p>foo</p>
            <wiki-h h-level="1" h-id="2">2. chapter</wiki-h>
            <p>foo</p>
            <wiki-h h-level="2" h-id="2.1">2.1 section</wiki-h>
            <p>foo</p>
            <wiki-h h-level="3" h-id="2.1.1">2.1.1 subsection</wiki-h>
            <p>foo</p>
            <wiki-h h-level="3" h-id="2.1.2">2.1.2 subsection</wiki-h>
            <p>foo</p>
            <wiki-h h-level="2" h-id="2.2">2.2 section</wiki-h>
            <p>foo</p>
            <wiki-h h-level="3" h-id="2.2.1">2.2.1 subsection</wiki-h>
            <p>foo</p>
            <wiki-h h-level="3" h-id="2.2.2">2.2.2 subsection</wiki-h>
            <p>foo</p>

        `;
        let options = {
            outline: {
                chapter: {
                    selector: 'wiki-h[h-level="1"]',
                    hashAttr: 'h-id'
                },
                section: {
                    selector: 'wiki-h[h-level="2"]',
                    hashAttr: 'h-id'
                },
                subsection: {
                    selector: 'wiki-h[h-level="3"]',
                    hashAttr: 'h-id'
                }
            },
            contents: {
                outlet: {
                    selector: '#toc-outlet'
                },
                list: {
                    parentTagName: 'ul',
                    childTagName: 'li'
                },
                anchor: {
                    template: '<router-link :to="{hash: \'[hash]\'}">[content]</router-link>'
                }
            }
        };
        let output = target(input, option.assignDefault(options));
        let $;

        beforeEach(() => {
            $ = cheerio.load(output, {xmlMode: true, decodeEntities: false });
        });

        it('table of contents is created', () => {
            expect($('#toc-outlet>ul>li>ul>li>ul>li').eq(7).html())
                .to.equals('<router-link :to="{hash: \'2.2.2\'}">2.2.2 subsection</router-link>');
        });

    });


});
