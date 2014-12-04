var Section = require('' + '../section');
var TextSection = require('./text');

class ArraySection extends Section {
    
    data: Array<TextSection>;
    
    constructor (name: string) {
        super(name);
        this.data = [];
    }
    
    /**
     * List all sections this array contains.
     */
    sections (): Array<TextSection> {
        return this.data;
    }
    
    /**
     * Adds a new text section to this array section.
     */
    push (data: string) {
        // Create a new text section
        var section = new TextSection('');
        section.push(data);
        
        // Add that onto our data and set it as a property, so we can
        // interface with this like an array.
        this.data.push(section);
        this[this.data.length - 1] = section;
    }
}

module.exports = ArraySection;