# Definitely Marked

It came to my attention that there was no "config" file format designed for document-based storage. For example, API documentation. XML was the closest, but we wanted the ability to embed or render HTML without the overhead and heirarchy of XML. Inspiration was taken from [Redis' documentation](https://github.com/antirez/redis-doc) for this.

### Usage

See [the fixture document](https://github.com/MCProHosting/definitely-marked/blob/master/spec/fixture/long.md) for a usage example. It's essentially a superset of Markdown. Sections are defined with a line starting with `@section`, then a name prefixed with a type annotation.

 * `=name` creates a "plain text" section.
 * `[]name` creates an array of plain text sections.
 * `{}name` treats the content of that section as a JSON object. Note that you can wrap the contents of this section in backticks for pretty display as markdown.

Here's how to parse that document:

```js
var marked = new Marked();
marked.read('long.md', function (err, result) {
    result['{}code'].data() // Returns a Js object: { "foo": "bar", "baz": [1, 2, 3] });
    result['{}code2'].data() // Returns the same thing
    
    result['=simple'].render(); // Render markdown: '<p>Simple section <em>here</em>.</p>');
    result['=simple'].text; // Or get the raw text of any section using .text
    
    result['[]list'][0].render(); // List types can be treated as arrays: '<p><em>One</em> fish</p>'
    result['[]list'].sections(); // You can also get all sections: [ <TextSection>, <TextSection>, ...]
});
```

### Contributing / License

This was written in Flowtype and ES6, compiled with the Traceur compiler until 0.12 finally comes out. Feel free to contribute. MIT license.