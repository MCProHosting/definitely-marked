var MarkedError = require('./error');

class Section {
    name: string;
    text: string;
    
    constructor (name: string) {
        this.name = name;
    }
    
    push (data: string) {
        if (this.text) {
            throw new MarkedError('Duplicate data for ' + this.name);
        }
        
        this.text = data;
    }
}

module.exports = Section;