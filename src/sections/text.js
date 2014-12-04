// Hack because flow doesn't pick up on "global" modules
var marked = require('' + 'marked');
var Section = require('' + '../section.js');


class TextSection extends Section {
    render (options?: Object): string {
        marked.setOptions(options || {});
        return marked(this.text);
    }
}

module.exports = TextSection;