const expect = require('chai').expect;
const cheerio = require('cheerio');

describe('contents.js', () => {

    const target = require('../lib/contents');
    const option = require('../lib/option');

    let outlines = [
        {
            headline: '1. chapter',
            id: '1',
            children: [
                {
                    headline: '1.1 section',
                    id: '1.1',
                    children: [
                        {
                            headline: '1.1.1 subsection',
                            id: '1.1.1'
                        },
                        {
                            headline: '1.1.2 subsection',
                            id: '1.1.2'
                        }
                    ]
                },
                {
                    headline: '1.2 section',
                    id: '1.2',
                    children: [
                        {
                            headline: '1.2.1 subsection',
                            id: '1.2.1'
                        },
                        {
                            headline: '1.2.2 subsection',
                            id: '1.2.2'
                        }
                    ]
                }
            ]
        },
        {
            headline: '2. chapter',
            id: '2',
            children: [
                {
                    headline: '2.1 section',
                    id: '2.1',
                    children: [
                        {
                            headline: '2.1.1 subsection',
                            id: '2.1.1'
                        },
                        {
                            headline: '2.1.2 subsection',
                            id: '2.1.2'
                        }
                    ]
                },
                {
                    headline: '2.2 section',
                    id: '2.2',
                    children: [
                        {
                            headline: '2.2.1 subsection',
                            id: '2.2.1'
                        },
                        {
                            headline: '2.2.2 subsection',
                            id: '2.2.2'
                        }
                    ]
                }
            ]
        }
    ];

    describe('defaultOptions', () => {

        let contents = target(outlines, option.defaultOptions);
        let $;

        beforeEach(() => {
            $ = cheerio.load(`<div id="contents">${contents}</div>`, {xmlMode: true});
        });

        it('1st level: # of items', () => {
            expect($('#contents>ol>li').length).to.equals(2);
        });

        it('1st level: textContent', () => {
            expect($('#contents>ol>li').eq(1).children('a').text()).to.equals('2. chapter');
        });

        it('1st level: href', () => {
            expect($('#contents>ol>li').eq(1).children('a').attr('href')).to.equals('#2');
        });

        it('2nd level: # of items', () => {
            expect($('#contents>ol>li>ol>li').length).to.equals(4);
        });

        it('2nd level: textContent', () => {
            expect($('#contents>ol>li>ol>li').eq(3).children('a').text()).to.equals('2.2 section');
        });

        it('2nd level: href', () => {
            expect($('#contents>ol>li>ol>li').eq(3).children('a').attr('href')).to.equals('#2.2');
        });

        it('3rd level: # of items', () => {
            expect($('#contents>ol>li>ol>li>ol>li').length).to.equals(8);
        });

        it('3rd level: textContent', () => {
            expect($('#contents>ol>li>ol>li>ol>li').eq(7).children('a').text()).to.equals('2.2.2 subsection');
        });

        it('3rd level: href', () => {
            expect($('#contents>ol>li>ol>li>ol>li').eq(7).children('a').attr('href')).to.equals('#2.2.2');
        });
    });

    describe('assign options', () => {

        let options = {
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
        let contents = target(outlines, option.assignDefault(options));
        let $;

        beforeEach(() => {
            $ = cheerio.load(`<div id="toc-outlet">${contents}</div>`, { xmlMode: true, decodeEntities: false });
        });

        it('1st level: # of items', () => {
            expect($('#toc-outlet>ul>li').length).to.equals(2);
        });

        it('1st level: textContent', () => {
            expect($('#toc-outlet>ul>li').eq(1).children('router-link').text()).to.equals('2. chapter');
        });

        it('1st level: href', () => {
            expect($('#toc-outlet>ul>li').eq(1).children('router-link').attr(':to')).to.equals('{hash: \'2\'}');
        });

        it('2nd level: # of items', () => {
            expect($('#toc-outlet>ul>li>ul>li').length).to.equals(4);
        });

        it('2nd level: textContent', () => {
            expect($('#toc-outlet>ul>li>ul>li').eq(3).children('router-link').text()).to.equals('2.2 section');
        });

        it('2nd level: href', () => {
            expect($('#toc-outlet>ul>li>ul>li').eq(3).children('router-link').attr(':to')).to.equals('{hash: \'2.2\'}');
        });

        it('3rd level: # of items', () => {
            expect($('#toc-outlet>ul>li>ul>li>ul>li').length).to.equals(8);
        });

        it('3rd level: textContent', () => {
            expect($('#toc-outlet>ul>li>ul>li>ul>li').eq(7).children('router-link').text()).to.equals('2.2.2 subsection');
        });

        it('3rd level: href', () => {
            expect($('#toc-outlet>ul>li>ul>li>ul>li').eq(7).children('router-link').attr(':to')).to.equals('{hash: \'2.2.2\'}');
        });

    });
});
