const expect = require('chai').expect;

describe('option.js', () => {

    describe('assignDefault()', () => {

        const target = require('../lib/option').assignDefault;

        it('if argument is null, return default options', () => {
            let opts = target(null);
            expect(opts.outline.chapter.selector).to.equals('h1');
        });

        it('if argument is undefined, return default options', () => {
            let opts = target(undefined);
            expect(opts.outline.chapter.selector).to.equals('h1');
        });

        it('single option property should be overridden', () => {
            let opts = target({
                outline: {
                    chapter: {
                        selector: 'custom-h1'
                    }
                }
            });
            expect(opts.outline.chapter.selector).to.equals('custom-h1');
            expect(opts.outline.chapter.hashAttr).to.equals('id');
            expect(opts.outline.section.selector).to.equals('h2');
            expect(opts.contents.outlet.selector).to.equals('#contents');
        });

        it('multiple option properties should be overridden', () => {
            let opts = target({
                outline: {
                    chapter: {
                        selector: 'custom-h1'
                    }
                },
                contents: {
                    list: {
                        parentTagName: 'ul'
                    }
                }
            });
            expect(opts.outline.chapter.selector).to.equals('custom-h1');
            expect(opts.contents.list.parentTagName).to.equals('ul');
            expect(opts.outline.chapter.hashAttr).to.equals('id');
            expect(opts.outline.section.selector).to.equals('h2');
            expect(opts.contents.outlet.selector).to.equals('#contents');
        });

    });
});
