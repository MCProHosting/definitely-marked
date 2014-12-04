// Eval is evil... but Flow doesn't like us requiring externally either.
var marked = eval("return require('marked')");
var Section = require('./section.js');


class TextSection extends Section {
    render (options?: Object): string {
        marked.setOptions(options || {});
        return marked(this.text);
    }
}

module.exports = TextSection;