var Section = require('./section');
var TextSection = require('./section.text');

class ArraySection extends Section {
    
    data: Array<string>;
    
    constructor (name: string) {
        super(name);
        this.data = [];
    }
    
    /**
     * List all sections this array contains.
     */
    sections () {
        return this.data;
    }
    
    /**
     * Adds a new text section to this array section.
     */
    push (data: string) {
        var section = new TextSection('');
        section.push(data);
        this.data.push(section);
    }
}

module.exports = ArraySection;