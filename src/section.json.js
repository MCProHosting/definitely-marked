var Section = require('./section.js');

class JsonSection extends Section {
    data (): string {
        var data = this.text;
        // If we have code blocks around the JSON, strip off the first
        // and last lines.
        if (data.slice(0, 3) === '```') {
            data = data.split('\n').slice(1, -1).join('\n');
        }
        
        return JSON.parse(data);
    }
}

module.exports = JsonSection;