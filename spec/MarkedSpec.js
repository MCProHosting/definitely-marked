var Marked = require('../index');

describe('marked', function () {
    it('should parse long correctly', function (done) {
        var m = new Marked();
        m.read(__dirname + '/fixture/long.md', function (err, result) {
            expect(result['{}code'].data()).toEqual({ "foo": "bar", "baz": [1, 2, 3] });
            expect(result['{}code2'].data()).toEqual({ "foo": "bar", "baz": [1, 2, 3] });
            expect(result['=simple'].render().trim()).toBe('<p>Simple section <em>here</em>.</p>');
            
            expect(result['[]list'][0].render().trim()).toBe('<p><em>One</em> fish</p>');
            expect(result['[]list'][1].render().trim()).toBe('<p><strong>Two</strong> fish</p>');
            expect(result['[]list'][2].render().trim()).toBe('<h1 id="red-fish">Red fish</h1>');
            expect(result['[]list'][3].render().trim()).toBe('<h2 id="blue-fish">Blue fish</h2>');
            
            done();
        });
    });
})